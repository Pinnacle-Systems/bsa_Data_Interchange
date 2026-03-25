-- CreateTable
CREATE TABLE `BOMINT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `srnNo` VARCHAR(191) NULL,
    `unit_code` VARCHAR(191) NULL,
    `erp_no` VARCHAR(191) NULL,
    `article_code` VARCHAR(191) NULL,
    `style_no` VARCHAR(191) NULL,
    `colour` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `inseam` VARCHAR(191) NULL,
    `garment_uom` VARCHAR(191) NULL,
    `fabric_code` VARCHAR(191) NULL,
    `fabric_desc` VARCHAR(191) NULL,
    `fabric_colour` VARCHAR(191) NULL,
    `fabric_supplier` VARCHAR(191) NULL,
    `fabric_type` VARCHAR(191) NULL,
    `fabric_consumption` VARCHAR(191) NULL,
    `fabric_uom` VARCHAR(191) NULL,
    `recd_date` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
