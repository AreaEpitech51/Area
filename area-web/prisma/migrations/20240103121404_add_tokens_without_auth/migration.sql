-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);
INSERT INTO "new_Token" ("id", "name", "user_id", "value") SELECT "id", "name", "user_id", "value" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_id_key" ON "Token"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
