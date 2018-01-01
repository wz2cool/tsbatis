-- --------------------------------------------------------
-- Host:                         wz2cool.wicp.net
-- Server version:               5.7.18-1+b1 - (Debian)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for northwind
USE `northwind`;

-- Dumping structure for table northwind.customer
CREATE TABLE IF NOT EXISTS `customer` (
  `id` varchar(50) NOT NULL,
  `company_name` varchar(100) DEFAULT '0',
  `contract_name` varchar(100) DEFAULT '0',
  `contract_title` varchar(100) DEFAULT '0',
  `address` varchar(100) DEFAULT '0',
  `city` varchar(100) DEFAULT '0',
  `region` varchar(100) DEFAULT '0',
  `postal_code` varchar(100) DEFAULT '0',
  `country` varchar(100) DEFAULT '0',
  `phone` varchar(100) DEFAULT '0',
  `fax` varchar(100) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table northwind.customer: ~2 rows (approximately)
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`id`, `company_name`, `contract_name`, `contract_title`, `address`, `city`, `region`, `postal_code`, `country`, `phone`, `fax`) VALUES
	('ALFKI', 'Alfreds Futterkiste', 'Maria Anders', 'Sales Representative', 'Obere Str. 57', 'Berlin', 'Western Europe', '12209', 'Germany', '030-0074321', '030-0076545'),
	('ANATR', 'Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Owner', 'Avda. de la Constitución 2222', 'México D.F.', 'Central America', '05021', 'Mexico', '(5) 555-4729', '(5) 555-3745');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- Dumping structure for table northwind.customer
CREATE TABLE IF NOT EXISTS `student` (
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `book` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB
;
