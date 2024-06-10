/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `status` on the `ReadingList` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `desc` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFinished` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReading` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pages` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFinished` to the `ReadingList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReading` to the `ReadingList` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `ReadingList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bookId` on the `ReadingList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ReadingList" DROP CONSTRAINT "ReadingList_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingList" DROP CONSTRAINT "ReadingList_userId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isFinished" BOOLEAN NOT NULL,
ADD COLUMN     "isReading" BOOLEAN NOT NULL,
ADD COLUMN     "pages" BIGINT NOT NULL,
ADD COLUMN     "quotes" TEXT,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ReadingList" DROP COLUMN "status",
ADD COLUMN     "isFinished" BOOLEAN NOT NULL,
ADD COLUMN     "isReading" BOOLEAN NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "bookId",
ADD COLUMN     "bookId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
