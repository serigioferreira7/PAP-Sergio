-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03-Fev-2025 às 20:22
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `gestor_encomendas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `administrator`
--

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `administrator`
--

INSERT INTO `administrator` (`id`, `name`, `pass`) VALUES
(1, 'Admin1', 'password1'),
(2, 'Admin2', 'password2'),
(3, 'Admin3', 'password3'),
(4, 'admin', '123456');

-- --------------------------------------------------------

--
-- Estrutura da tabela `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `products` varchar(255) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `orderDate` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pendente',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `action` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `orders`
--

INSERT INTO `orders` (`id`, `customerName`, `products`, `totalPrice`, `orderDate`, `status`, `createdAt`, `updatedAt`, `action`) VALUES
(14, 'Sergio', '[{\"id\":14,\"value\":25.99,\"productName\":\"Camisola Malha Mulher Colorida - €25.99\"},{\"id\":15,\"value\":29.99,\"productName\":\"Calças Ganga Mulher - €29.99\"}]', 55.98, '2025-02-02 20:31:21', 'confirmada', '2025-02-02 20:31:21', '2025-02-03 18:22:22', NULL),
(23, 'joao', '[{\"id\":17,\"value\":29.99,\"productName\":\"T-shirt Homem  - €29.99\"},{\"id\":24,\"value\":19.99,\"productName\":\"ddd - €19.99\"}]', 49.98, '2025-02-03 15:24:14', 'Cancelada', '2025-02-03 15:24:14', '2025-02-03 18:51:30', NULL),
(25, 'pedro', '[{\"id\":15,\"value\":29.99,\"productName\":\"Calças Ganga Mulher Azuis - €29.99\"}]', 29.99, '2025-02-03 15:28:54', 'Confirmada', '2025-02-03 15:28:54', '2025-02-03 18:59:05', NULL),
(26, 'maria', '[{\"id\":15,\"value\":29.99,\"productName\":\"Calças Ganga Mulher Azuis - €29.99\"}]', 29.99, '2025-02-03 15:29:51', 'Pendente', '2025-02-03 15:29:51', '2025-02-03 15:29:51', NULL),
(28, 'diogo', '[{\"id\":16,\"value\":29.99,\"productName\":\"Camisola Malha Mulher Amarela - €29.99\"}]', 29.99, '2025-02-03 15:34:27', 'Pendente', '2025-02-03 15:34:27', '2025-02-03 15:34:27', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL,
  `reference` text NOT NULL,
  `productName` varchar(50) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `weight` decimal(10,5) NOT NULL,
  `img` text NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `product`
--

INSERT INTO `product` (`id`, `idCategory`, `active`, `reference`, `productName`, `value`, `weight`, `img`, `created`, `updated`) VALUES
(15, 0, 0, '', 'Calças Ganga Mulher', 29.99, 0.00000, 'https://media.istockphoto.com/id/1281304280/pt/foto/folded-blue-jeans-on-a-white-background-modern-casual-clothing-flat-lay-copy-space.jpg?s=612x612&w=0&k=20&c=0jSQVIuZPSI69Mc-Xom54xGWyLSW5335ofQG3gecxq4=', '2025-02-02 15:56:45', '2025-02-02 15:56:45'),
(16, 0, 0, '', 'Camisola Malha Mulher Amarela', 29.99, 0.00000, 'https://media.istockphoto.com/id/1278802435/pt/foto/sweater-yellow-color-isolated-on-white-trendy-womens-clothing-knitted-apparel.jpg?s=612x612&w=0&k=20&c=uJzsnZvyLnl1c2ELwgEupp7Pmq71gNmvcmuRXNU-UDc=', '2025-02-02 15:56:45', '2025-02-02 15:56:45'),
(17, 0, 0, '', 'T-shirt Homem ', 29.99, 0.00000, 'https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8', '2025-02-02 15:56:45', '2025-02-02 15:56:45');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategory` (`idCategory`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
