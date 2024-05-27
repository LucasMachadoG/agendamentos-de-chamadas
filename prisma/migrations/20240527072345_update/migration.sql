-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_time_intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekDay" INTEGER NOT NULL,
    "timeStartInMinutes" INTEGER NOT NULL,
    "timeEndInMinutes" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "user_time_intervals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user_time_intervals" ("id", "timeEndInMinutes", "timeStartInMinutes", "user_id", "weekDay") SELECT "id", "timeEndInMinutes", "timeStartInMinutes", "user_id", "weekDay" FROM "user_time_intervals";
DROP TABLE "user_time_intervals";
ALTER TABLE "new_user_time_intervals" RENAME TO "user_time_intervals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
