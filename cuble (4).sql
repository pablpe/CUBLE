-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2024 a las 20:56:00
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
-- Base de datos: `cuble`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `algoritmos`
--

CREATE TABLE `algoritmos` (
  `id_alg` int(11) NOT NULL,
  `movimientos` varchar(1000) NOT NULL,
  `alg_set` varchar(50) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `Ulb` varchar(50) NOT NULL,
  `Ub` varchar(50) NOT NULL,
  `Urb` varchar(50) NOT NULL,
  `Ul` varchar(50) NOT NULL,
  `U` varchar(50) NOT NULL,
  `Ur` varchar(50) NOT NULL,
  `Ulf` varchar(50) NOT NULL,
  `Uf` varchar(50) NOT NULL,
  `Urf` varchar(50) NOT NULL,
  `Fl` varchar(50) NOT NULL,
  `F` varchar(50) NOT NULL,
  `Fr` varchar(50) NOT NULL,
  `Bl` varchar(50) NOT NULL,
  `B` varchar(50) NOT NULL,
  `Br` varchar(50) NOT NULL,
  `Lb` varchar(50) NOT NULL,
  `L` varchar(50) NOT NULL,
  `Lf` varchar(50) NOT NULL,
  `Rb` varchar(50) NOT NULL,
  `R` varchar(50) NOT NULL,
  `Rf` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `algoritmos`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigos`
--

CREATE TABLE `amigos` (
  `id_amigos` int(11) NOT NULL,
  `id_usuario1` int(11) NOT NULL,
  `id_usuario2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `amigos`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id_usuario` int(11) NOT NULL,
  `id_mejor_tiempo` int(11) NOT NULL,
  `mejor_media` decimal(10,0) NOT NULL,
  `victorias` int(11) NOT NULL,
  `derrotas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_amistad`
--

CREATE TABLE `solicitudes_amistad` (
  `id_solicitud` int(11) NOT NULL,
  `id_solicitante` int(11) NOT NULL,
  `id_solicitado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes_amistad`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solves`
--

CREATE TABLE `solves` (
  `id_solve` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tiempo` decimal(10,2) NOT NULL,
  `scramble` varchar(50) NOT NULL,
  `solucion` varchar(5000) NOT NULL,
  `n_movimientos` int(11) NOT NULL,
  `tps` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solves`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `primer_apellido` varchar(50) NOT NULL,
  `segundo_apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nick` varchar(20) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `creado_en` timestamp NULL DEFAULT current_timestamp(),
  `imagen` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--


-- Índices para tablas volcadas
--

--
-- Indices de la tabla `algoritmos`
--
ALTER TABLE `algoritmos`
  ADD PRIMARY KEY (`id_alg`);

--
-- Indices de la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`id_amigos`) USING BTREE;

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `solicitudes_amistad`
--
ALTER TABLE `solicitudes_amistad`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_solicitante` (`id_solicitante`),
  ADD KEY `id_solicitado` (`id_solicitado`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`,`nick`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `algoritmos`
--
ALTER TABLE `algoritmos`
  MODIFY `id_alg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=437;

--
-- AUTO_INCREMENT de la tabla `amigos`
--
ALTER TABLE `amigos`
  MODIFY `id_amigos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `solicitudes_amistad`
--
ALTER TABLE `solicitudes_amistad`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`id_usuario1`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`id_usuario2`) REFERENCES `perfil` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudes_amistad`
--
ALTER TABLE `solicitudes_amistad`
  ADD CONSTRAINT `solicitudes_amistad_ibfk_1` FOREIGN KEY (`id_solicitante`) REFERENCES `amigos` (`id_amigos`),
  ADD CONSTRAINT `solicitudes_amistad_ibfk_2` FOREIGN KEY (`id_solicitado`) REFERENCES `amigos` (`id_amigos`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
