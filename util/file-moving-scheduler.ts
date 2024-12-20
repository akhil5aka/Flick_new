import cron from "node-cron";
import { readdirSync, renameSync, statSync } from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import moment from "moment";

let running = false;

const moveOldOUTFiles = async () => {
  console.log("in moveold");

  running = true;

  const src = process.env.OUT_FOLDER!;
  const dst = process.env.ARCHIVE_OUT_FOLDER!;

  try {
    const files = readdirSync(src);
    const tenMinutesAgo = moment().subtract(10, "minutes");

    console.log(src, "files");
    let count = 0;
    for (const file of files) {
      const filePath = path.join(src, file);
      const stats = await statSync(filePath);
      const fileTime = moment(stats.mtime);

      if (fileTime.isBefore(tenMinutesAgo)) {
        const destPath = path.join(dst, file);
        await renameSync(filePath, destPath);
        count++;
      }
    }
    if (count > 0) console.log(`Moved ${count} files`);
  } catch (error) {
    console.error("Error moving files", error);
    running = false;
  } finally {
    running = false;
  }
};

export const startFileMovingScheduler = () => {
  cron.schedule("*/10 * * * *", moveOldOUTFiles);
  console.log("File moving scheduler has been scheduled :)");
};
