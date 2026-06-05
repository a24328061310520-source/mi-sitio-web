-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-03-2026 a las 20:55:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jujutsu_kaisen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bandos`
--

CREATE TABLE `bandos` (
  `id_bando` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bandos`
--

INSERT INTO `bandos` (`id_bando`, `nombre`) VALUES
(1, 'Bueno'),
(2, 'Malo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `id_personaje` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `id_bando` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`id_personaje`, `nombre`, `tipo`, `id_bando`) VALUES
(1, 'Yuji Itadori', 'Hechicero', 1),
(2, 'Satoru Gojo', 'Hechicero', 1),
(3, 'Sukuna', 'Maldicion', 2),
(4, 'Mahito', 'Maldicion', 2),
(5, 'Yuji Itadori', 'Hechicero', 1),
(6, 'Satoru Gojo', 'Hechicero', 1),
(7, 'Megumi Fushiguro', 'Hechicero', 1),
(8, 'Nobara Kugisaki', 'Hechicero', 1),
(9, 'Maki Zenin', 'Hechicero', 1),
(10, 'Toge Inumaki', 'Hechicero', 1),
(11, 'Panda', 'Hechicero', 1),
(12, 'Kento Nanami', 'Hechicero', 1),
(13, 'Yuta Okkotsu', 'Hechicero', 1),
(14, 'Ryomen Sukuna', 'Maldicion', 2),
(15, 'Mahito', 'Maldicion', 2),
(16, 'Suguru Geto', 'Maldicion', 2),
(17, 'Jogo', 'Maldicion', 2),
(18, 'Hanami', 'Maldicion', 2),
(19, 'Dagon', 'Maldicion', 2),
(20, 'Toji Fushiguro', 'Asesino', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personaje_tecnica`
--

CREATE TABLE `personaje_tecnica` (
  `id` int(11) NOT NULL,
  `id_personaje` int(11) DEFAULT NULL,
  `id_tecnica` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personaje_tecnica`
--

INSERT INTO `personaje_tecnica` (`id`, `id_personaje`, `id_tecnica`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicas`
--

CREATE TABLE `tecnicas` (
  `id_tecnica` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tecnicas`
--

INSERT INTO `tecnicas` (`id_tecnica`, `nombre`) VALUES
(1, 'Black Flash'),
(2, 'Limitless'),
(3, 'Dominio Maldito');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bandos`
--
ALTER TABLE `bandos`
  ADD PRIMARY KEY (`id_bando`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id_personaje`),
  ADD KEY `id_bando` (`id_bando`);

--
-- Indices de la tabla `personaje_tecnica`
--
ALTER TABLE `personaje_tecnica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_personaje` (`id_personaje`),
  ADD KEY `id_tecnica` (`id_tecnica`);

--
-- Indices de la tabla `tecnicas`
--
ALTER TABLE `tecnicas`
  ADD PRIMARY KEY (`id_tecnica`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bandos`
--
ALTER TABLE `bandos`
  MODIFY `id_bando` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id_personaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `personaje_tecnica`
--
ALTER TABLE `personaje_tecnica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tecnicas`
--
ALTER TABLE `tecnicas`
  MODIFY `id_tecnica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD CONSTRAINT `personajes_ibfk_1` FOREIGN KEY (`id_bando`) REFERENCES `bandos` (`id_bando`);

--
-- Filtros para la tabla `personaje_tecnica`
--
ALTER TABLE `personaje_tecnica`
  ADD CONSTRAINT `personaje_tecnica_ibfk_1` FOREIGN KEY (`id_personaje`) REFERENCES `personajes` (`id_personaje`),
  ADD CONSTRAINT `personaje_tecnica_ibfk_2` FOREIGN KEY (`id_tecnica`) REFERENCES `tecnicas` (`id_tecnica`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
