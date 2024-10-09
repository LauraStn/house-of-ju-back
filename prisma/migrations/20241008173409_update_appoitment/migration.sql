/*
  Warnings:

  - You are about to drop the column `available_slot_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Available_slot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_available_slot_id_fkey`;

-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `available_slot_id`,
    DROP COLUMN `status`;

-- DropTable
DROP TABLE `Available_slot`;
