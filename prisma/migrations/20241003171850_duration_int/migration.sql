/*
  Warnings:

  - You are about to drop the column `service_id` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `nail_service_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duration` on the `Nail_service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_service_id_fkey`;

-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `service_id`,
    ADD COLUMN `nail_service_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Nail_service` MODIFY `description` TEXT NOT NULL,
    DROP COLUMN `duration`,
    ADD COLUMN `duration` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_nail_service_id_fkey` FOREIGN KEY (`nail_service_id`) REFERENCES `Nail_service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
