-- DropForeignKey
ALTER TABLE "ReadingList" DROP CONSTRAINT "ReadingList_bookId_fkey";

-- AlterTable
ALTER TABLE "ReadingList" ALTER COLUMN "bookId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
