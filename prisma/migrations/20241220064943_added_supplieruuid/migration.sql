-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "position" VARCHAR(50),
    "salary" DECIMAL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_invoice" (
    "id" SERIAL NOT NULL,
    "invoice_number" VARCHAR(200),
    "uuid" VARCHAR(200),
    "status" VARCHAR(100),
    "submissionuid" VARCHAR(400),
    "supplierUUID" VARCHAR(400),
    "longid" VARCHAR(400),
    "doc_reasson" VARCHAR(400),

    CONSTRAINT "tb_invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_name" (
    "name" VARCHAR(100),
    "email" VARCHAR(100),
    "id" SERIAL NOT NULL,

    CONSTRAINT "tb_name_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_uuid" ON "tb_invoice"("uuid");
