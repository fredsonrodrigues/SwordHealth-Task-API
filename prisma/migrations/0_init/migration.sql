-- CreateTable
CREATE TABLE `task` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `timestamp` DATETIME(0) NOT NULL,
    `user_id` BIGINT NOT NULL,

    UNIQUE INDEX `unique_id`(`id`),
    INDEX `lnk_user_task`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` LONGTEXT NOT NULL,
    `password` TEXT NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL,
    `admin_user` BIGINT NOT NULL,

    UNIQUE INDEX `unique_id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `lnk_user_task` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

