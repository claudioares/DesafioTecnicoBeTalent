/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_product_id_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customer_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sale_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
