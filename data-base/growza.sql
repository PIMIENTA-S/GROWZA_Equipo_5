-- Base de datos: `growza`
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `carrito`
--

DROP TABLE IF EXISTS `carrito`;
CREATE TABLE IF NOT EXISTS `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_carrito`),
  UNIQUE KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id_carrito`, `id_usuario`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`, `descripcion`) VALUES
(1, 'Vegetales', 'Verduras y hortalizas frescas'),
(2, 'Frutas', 'Frutas de temporada'),
(3, 'Bebidas', 'Jugos y bebidas naturales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_carrito`
--

DROP TABLE IF EXISTS `detalle_carrito`;
CREATE TABLE IF NOT EXISTS `detalle_carrito` (
  `id_detalle_carrito` int NOT NULL AUTO_INCREMENT,
  `id_carrito` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_detalle_carrito`),
  KEY `id_carrito` (`id_carrito`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_carrito`
--

INSERT INTO `detalle_carrito` (`id_detalle_carrito`, `id_carrito`, `id_producto`, `cantidad`) VALUES
(1, 1, 1, 2),
(2, 1, 3, 3),
(3, 2, 4, 5),
(4, 3, 5, 2),
(5, 4, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
CREATE TABLE IF NOT EXISTS `detalle_pedido` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 1, 2, 1800.00),
(2, 1, 3, 3, 2500.00),
(3, 2, 4, 5, 2000.00),
(4, 3, 5, 2, 4500.00),
(5, 4, 2, 4, 2200.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE IF NOT EXISTS `factura` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_pago` int NOT NULL,
  `fecha_emision` datetime NOT NULL,
  `numero_factura` varchar(50) NOT NULL,
  PRIMARY KEY (`id_factura`),
  UNIQUE KEY `numero_factura` (`numero_factura`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_pago` (`id_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id_factura`, `id_pedido`, `id_pago`, `fecha_emision`, `numero_factura`) VALUES
(1, 1, 1, '2025-09-06 11:05:00', 'FAC-001'),
(2, 2, 2, '2025-09-06 12:35:00', 'FAC-002'),
(3, 3, 3, '2025-09-07 10:05:00', 'FAC-003'),
(4, 4, 4, '2025-09-07 15:45:00', 'FAC-004'),
(5, 5, 5, '2025-09-08 11:35:00', 'FAC-005');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `monto` decimal(10,2) NOT NULL,
  `fecha_pago` datetime NOT NULL,
  `metodo_pago` enum('PSE','Tarjeta Credito','Tarjeta Debito','Efectivo','Stripe','PayPal') DEFAULT 'Efectivo',
  `estado_pago` enum('Proceso','Aceptado','Rechazado') DEFAULT 'Proceso',
  PRIMARY KEY (`id_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id_pago`, `monto`, `fecha_pago`, `metodo_pago`, `estado_pago`) VALUES
(1, 9100.00, '2025-09-06 11:00:00', 'Tarjeta Credito', 'Aceptado'),
(2, 10000.00, '2025-09-06 12:30:00', 'PSE', 'Proceso'),
(3, 9000.00, '2025-09-07 10:00:00', 'Efectivo', 'Aceptado'),
(4, 8800.00, '2025-09-07 15:40:00', 'PayPal', 'Rechazado'),
(5, 4500.00, '2025-09-08 11:30:00', 'Stripe', 'Aceptado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('Pendiente','Pagado','Cancelado') DEFAULT 'Pendiente',
  PRIMARY KEY (`id_pedido`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_usuario`, `fecha_pedido`, `total`, `estado`) VALUES
(1, 1, '2025-09-06 10:30:00', 9100.00, 'Pagado'),
(2, 2, '2025-09-06 12:15:00', 10000.00, 'Pendiente'),
(3, 3, '2025-09-07 09:45:00', 9000.00, 'Pagado'),
(4, 4, '2025-09-07 15:20:00', 8800.00, 'Cancelado'),
(5, 5, '2025-09-08 11:10:00', 4500.00, 'Pagado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(80) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `imagen_url` varchar(255) DEFAULT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `descripcion`, `precio`, `stock`, `imagen_url`, `id_categoria`) VALUES
(1, 'Lechuga', 'Lechuga fresca y crocante', 1800.00, 80, 'img/lechuga.jpg', 1),
(2, 'Tomate', 'Tomate rojo jugoso', 2200.00, 120, 'img/tomate.jpg', 1),
(3, 'Manzana Roja', 'Manzana fresca y crujiente', 2500.00, 100, 'img/manzana.jpg', 2),
(4, 'Banano', 'Banano dulce y natural', 2000.00, 150, 'img/banano.jpg', 2),
(5, 'Jugo de Naranja', 'Bebida natural exprimida', 4500.00, 60, 'img/jugo.jpg', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `fecha_registro` date NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `correo`, `contrasena`, `fecha_registro`) VALUES
(1, 'Carlos', 'Gómez', 'carlosg@example.com', '1234', '2025-09-01'),
(2, 'Laura', 'Martínez', 'lauram@example.com', 'abcd', '2025-09-02'),
(3, 'Andrés', 'Pérez', 'andresp@example.com', 'pass123', '2025-09-03'),
(4, 'María', 'Rodríguez', 'mariar@example.com', 'secure1', '2025-09-04'),
(5, 'Sofía', 'López', 'sofial@example.com', 'clave99', '2025-09-05');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD CONSTRAINT `detalle_carrito_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`),
  ADD CONSTRAINT `detalle_carrito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_pago`) REFERENCES `pagos` (`id_pago`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
