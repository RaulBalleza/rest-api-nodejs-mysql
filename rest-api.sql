-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 13-03-2020 a las 17:45:30
-- Versión del servidor: 5.7.29-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rest-api`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addOrEditEmployee` (IN `_id` INT(11), IN `_name` VARCHAR(255), IN `_salary` INT(11))  NO SQL
IF _id = 0 THEN
        INSERT INTO employees(name,salary)
        VALUES(_name, _salary);
        
        SET _id = LAST_INSERT_ID();
    ELSE
    	UPDATE employees 
        SET 
        name = _name, 
        salary = _salary WHERE id = _id;
	END IF$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteEmployee` (IN `_id` INT)  NO SQL
DELETE FROM employees WHERE id = _id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmployee` (IN `_id` INT(11))  NO SQL
SELECT * FROM employees WHERE id = _id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmployees` ()  NO SQL
SELECT * FROM employees$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`id`, `name`, `salary`) VALUES
(2, 'Lucas Balleza', 20000),
(4, 'Test', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
