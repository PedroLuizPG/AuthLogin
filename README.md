# 🔐 Sistema de Login com Proteção de Rotas

Este é um sistema de login desenvolvido com **ReactJS** e **TypeScript**,onde pude estudar e melhorar minhas habilidades no frontend utilizando **Firebase Authentication** para autenticação de usuários e **Firestore** para armazenamento de dados. A interface foi construída com alguns componentes do **Material UI** e **Tailwind CSS**. A rota da **Home** está protegida, sendo acessível apenas por usuários autenticados.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **ReactJS**
- 🟦 **TypeScript**
- 🔥 **Firebase Authentication**
- 🔥 **Firebase Firestore**
- 🎨 **Material UI**
- 🌬️ **Tailwind CSS**

---

## 🔐 Funcionalidades

- Cadastro de usuários
- Login com email e senha
- Logout
- Proteção de rotas (ex: a página **Home** só é acessível se o usuário estiver logado)
- Armazenamento de dados no Firestore

---

## 🔧 Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
2. Instale as dependências:
```
   npm install
```
Configure o Firebase:

Crie um projeto no Firebase

 -> Ative a autenticação com Email/Senha

 -> Copie suas credenciais e adicione no arquivo firebase.ts

Rode o projeto:
```
npm run dev
```
