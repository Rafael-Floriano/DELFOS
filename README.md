# QDele

QDele é uma aplicação web moderna que combina um frontend em React com um backend em Spring Boot com integração a um MCP server para realizar consultas no banco de dados via voz.

## 🚀 Tecnologias

### Frontend
- React 19
- TypeScript
- Material-UI (MUI)
- React Router DOM
- Vite
- Axios

### Backend
- Spring Boot 3.4.3
- Java 17
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- Spring AI (Ollama)
- Lombok

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- Java 17 ou superior
- Maven
- PostgreSQL
- Docker (opcional)

## 🔧 Instalação

### Backend

1. Navegue até o diretório do backend:
```bash
cd qdele-backend
```

2. Instale as dependências e compile o projeto:
```bash
./mvnw clean install
```

3. Configure o banco de dados PostgreSQL no arquivo `application.properties`

4. Execute o projeto:
```bash
./mvnw spring-boot:run
```

### Frontend

1. Navegue até o diretório do frontend:
```bash
cd qdele-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

## 🛠️ Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run lint` - Executa o linter
- `npm run preview` - Visualiza a build de produção localmente

### Backend
- `./mvnw spring-boot:run` - Inicia o servidor Spring Boot
- `./mvnw clean install` - Limpa e compila o projeto

## 📚 Documentação

A documentação da API está disponível através do Swagger UI quando o backend estiver em execução:
```
http://localhost:8080/swagger-ui.html
```

## 🔐 Segurança

O projeto utiliza Spring Security com autenticação JWT para proteger as rotas da API.

## 📝 Licença

Este projeto está sob a licença MIT. 