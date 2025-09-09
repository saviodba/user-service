# 👥 User Service

## 📖 Descrição
O **User Service** é um microserviço responsável pela **administração de usuários e perfis**.  
Ele foi desenvolvido utilizando **Node.js + TypeScript**, seguindo princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, garantindo separação de responsabilidades, testabilidade e facilidade de manutenção.

O serviço permite:  
- Criar, editar, deletar e listar **usuários**  
- Gerenciar **perfis (roles)**  
- Gerar e atualizar credenciais (API Keys, senhas)  

---

## 🏗️ Arquitetura

A aplicação segue os princípios de **Clean Architecture** com as seguintes camadas principais:


📦 user-service
┣ 📂 dist # Código compilado para produção
┣ 📂 logs # Logs de execução
┣ 📂 node_modules # Dependências do projeto
┣ 📂 prisma # Configuração do ORM Prisma
┃ ┗ 📜 schema.prisma # Definição do banco de dados
┣ 📂 src
┃ ┣ 📂 adapters # Adaptadores (controllers, http, etc.)
┃ ┣ 📂 application
┃ ┃ ┣ 📂 DTOs # Objetos de transferência de dados
┃ ┃ ┗ 📂 usecases # Casos de uso (regras de negócio)
┃ ┃ ┣ 📂 perfil # Casos de uso relacionados a perfis
┃ ┃ ┗ 📂 user # Casos de uso relacionados a usuários
┃ ┣ 📂 config # Configurações gerais (variáveis, logger, etc.)
┃ ┣ 📂 core
┃ ┃ ┗ 📂 errors # Tratamento centralizado de erros
┃ ┣ 📂 domain
┃ ┃ ┣ 📂 entities # Entidades do domínio
┃ ┃ ┣ 📂 repositories # Interfaces dos repositórios
┃ ┃ ┗ 📂 value-objects # Objetos de valor do domínio
┃ ┣ 📂 infrastructure # Implementações técnicas (ORM, serviços externos)
┃ ┗ 📂 shared # Utilitários e módulos compartilhados
┣ 📜 .env.example # Exemplo de variáveis de ambiente
┣ 📜 .gitignore # Arquivos ignorados pelo Git
┣ 📜 package.json # Dependências do projeto
┣ 📜 package-lock.json # Lock das dependências
┣ 📜 tsconfig.json # Configuração do TypeScript
┣ 📜 tsconfig.tsbuildinfo# Cache de build do TS
┗ 📜 README.md # Documentação do projeto


---

## ⚙️ Tecnologias
- **Node.js** + **TypeScript**
- **Prisma ORM**  
- **MySQL / PostgreSQL** (configurável via `schema.prisma`)
- **Clean Architecture + DDD**
- **JWT** para autenticação
- **Logger** centralizado

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (>= 18)  
- Banco de dados compatível (MySQL/Postgres)  
- Prisma CLI (`npm install -g prisma`)

### Passos
```bash
# Clone o repositório
git clone https://github.com/sua-org/user-service.git
cd user-service

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrações do banco
npx prisma migrate dev

# Inicie a aplicação
npm run dev


