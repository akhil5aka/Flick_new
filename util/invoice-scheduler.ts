import cron from 'node-cron';
import { prisma } from '../util/database_connection';
import { Endpoints } from '../src/core/api/Endpoint_hits';
import { configDotenv } from 'dotenv';

configDotenv();

let running = false;

const checkBatchStatus = async () => {
    if (running) {
        console.log('Already running');
        return;
    }
    running = true;
    try {
        const documents = await prisma.tb_invoice.findMany({ where: { status: 'submitted' } });
        const api = Endpoints.getInstance();


            console.log(documents,"docs")
       

        for (const document of documents) {
            // console.log(document.supplierUUID)
            // process.exit(0)
            console.log(`Triggering GetStatus for document ${document.invoice_number}`);
            await api.GetStatus({ uuid: document.uuid! }, document.supplierUUID!); // Trigger GetStatus
        }
    } catch (e) {
        console.error("Task encountered an error:", e);
    } finally {
        running = false;
    }
};

export const startInvoiceScheduler = () => {
    cron.schedule('*/10 * * * * *', checkBatchStatus);
    console.log('Invoice scheduler has been scheduled :)');
};
