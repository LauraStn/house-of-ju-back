/*
  Warnings:

  - You are about to drop the column `date_time` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `date_time`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `end` INTEGER NOT NULL,
    ADD COLUMN `start` INTEGER NOT NULL;
