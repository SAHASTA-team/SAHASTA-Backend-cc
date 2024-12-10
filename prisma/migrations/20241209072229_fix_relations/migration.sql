/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `lastMeasured` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the `GrowthRecord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `birthDate` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Child` DROP FOREIGN KEY `Child_userId_fkey`;

-- DropForeignKey
ALTER TABLE `GrowthRecord` DROP FOREIGN KEY `GrowthRecord_childId_fkey`;

-- AlterTable
ALTER TABLE `Child` DROP COLUMN `dateOfBirth`,
    DROP COLUMN `lastMeasured`,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `bmi` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `GrowthRecord`;

-- CreateTable
CREATE TABLE `NutritionScan` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `nutrients` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChildProgress` (
    `id` CHAR(36) NOT NULL,
    `childId` CHAR(36) NOT NULL,
    `height` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `bmi` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NutritionScan` ADD CONSTRAINT `NutritionScan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChildProgress` ADD CONSTRAINT `ChildProgress_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
