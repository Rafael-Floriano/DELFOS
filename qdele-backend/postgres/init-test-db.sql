-- Criando a tabela Cliente
CREATE TABLE IF NOT EXISTS cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Criando a tabela Endereco
CREATE TABLE IF NOT EXISTS endereco (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES cliente(id),
    rua VARCHAR(255) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(10) NOT NULL
);

-- Criando a tabela Produto
CREATE TABLE IF NOT EXISTS produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

-- Criando a tabela Venda
CREATE TABLE IF NOT EXISTS venda (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES cliente(id),
    produto_id INT REFERENCES produto(id),
    quantidade INT NOT NULL,
    total DECIMAL(10,2) NOT NULL
);

-- Inserindo clientes adicionais
INSERT INTO cliente (nome, email) VALUES
('Carlos Pereira', 'carlos@email.com'),
('Ana Souza', 'ana@email.com'),
('Fernando Lima', 'fernando@email.com'),
('Juliana Mendes', 'juliana@email.com'),
('Ricardo Alves', 'ricardo@email.com');

-- Inserindo endereços adicionais
INSERT INTO endereco (cliente_id, rua, cidade, estado, cep) VALUES
(3, 'Rua C', 'Belo Horizonte', 'MG', '30130-000'),
(4, 'Rua D', 'Curitiba', 'PR', '80240-000'),
(5, 'Rua E', 'Porto Alegre', 'RS', '90050-000'),
(6, 'Rua F', 'Salvador', 'BA', '40010-000'),
(7, 'Rua G', 'Recife', 'PE', '50030-000');

-- Inserindo mais produtos
INSERT INTO produto (nome, preco) VALUES
('Teclado Mecânico', 450.00),
('Monitor 27"', 1800.00),
('Cadeira Gamer', 1200.00),
('Headset Bluetooth', 300.00),
('SSD 1TB', 600.00);

-- Inserindo mais vendas
INSERT INTO venda (cliente_id, produto_id, quantidade, total) VALUES
(3, 3, 1, 450.00),   -- Carlos comprou um teclado mecânico
(4, 4, 2, 3600.00),  -- Ana comprou dois monitores de 27"
(5, 5, 1, 1200.00),  -- Fernando comprou uma cadeira gamer
(6, 6, 1, 300.00),   -- Juliana comprou um headset Bluetooth
(7, 7, 2, 1200.00),  -- Ricardo comprou dois SSDs de 1TB
(1, 3, 1, 450.00),   -- João comprou um teclado mecânico
(2, 4, 1, 1800.00);  -- Maria comprou um monitor de 27"

