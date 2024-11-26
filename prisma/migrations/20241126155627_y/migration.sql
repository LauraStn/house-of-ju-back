/*
  Warnings:

  - You are about to alter the column `name` on the `Nail_service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(70)`.
  - You are about to alter the column `name` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `first_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `last_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `address` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `token` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Nail_service` MODIFY `name` VARCHAR(70) NOT NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `name` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `first_name` VARCHAR(50) NOT NULL,
    MODIFY `last_name` VARCHAR(50) NOT NULL,
    MODIFY `address` VARCHAR(150) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `token` VARCHAR(100) NULL;
