-- CreateTable
CREATE TABLE `CMTINT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `srnNo` BIGINT NULL,
    `erp_no` VARCHAR(191) NULL,
    `resouce_code` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `style_no` VARCHAR(191) NULL,
    `budget_eff` VARCHAR(191) NULL,
    `sam` VARCHAR(191) NULL,
    `ISCOMPLETE` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
