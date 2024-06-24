/*
  Warnings:

  - You are about to drop the column `userId` on the `scheduling` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_userId_fkey";

-- AlterTable
ALTER TABLE "scheduling" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
