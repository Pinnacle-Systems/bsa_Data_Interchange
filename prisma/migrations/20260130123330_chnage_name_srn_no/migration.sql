/*
  Warnings:

  - You are about to drop the column `srnno` on the `fabricint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fabricint` DROP COLUMN `srnno`,
    ADD COLUMN `srnNo` BIGINT NULL;
