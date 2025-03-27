/*
  Warnings:

  - You are about to drop the column `geojson` on the `tripsuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `tripsuggestion` table. All the data in the column will be lost.
  - Added the required column `destination` to the `TripSuggestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tripsuggestion` DROP COLUMN `geojson`,
    DROP COLUMN `title`,
    ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `destination` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `website` VARCHAR(191) NULL;
