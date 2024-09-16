-- DropForeignKey
ALTER TABLE "ReadingList" DROP CONSTRAINT "ReadingList_userId_fkey";

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
