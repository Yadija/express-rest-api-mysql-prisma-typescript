-- CreateTable
CREATE TABLE `threads` (
    `id` VARCHAR(50) NOT NULL,
    `content` VARCHAR(50) NOT NULL,
    `owner` VARCHAR(50) NOT NULL,
    `created_at` TEXT NOT NULL,
    `updated_at` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `threads` ADD CONSTRAINT `threads_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
