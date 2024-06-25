-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_user_id_fkey";

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
