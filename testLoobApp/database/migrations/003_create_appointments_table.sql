CREATE TABLE IF NOT EXISTS `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `providerId` INT NOT NULL,
  `userId` INT NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
  FOREIGN KEY (`providerId`) REFERENCES `providers`(`id`)
);
