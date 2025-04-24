🔐 Sistema de Login com Proteção de Rotas
Este é um sistema de login desenvolvido com ReactJS e TypeScript, utilizando Firebase Authentication para autenticação de usuários e Firestore para armazenamento de dados. A interface foi construída com Material UI e Tailwind CSS. A rota da Home está protegida, sendo acessível apenas por usuários autenticados.

🚀 Tecnologias Utilizadas
⚛️ ReactJS

🟦 TypeScript

🔥 Firebase Authentication

🔥 Firebase Firestore

🎨 Material UI

🌬️ Tailwind CSS

🔐 Funcionalidades
Cadastro de usuários

Login com email e senha

Logout

Proteção de rotas (ex: a página Home só é acessível se o usuário estiver logado)

Armazenamento de dados no Firestore

📁 Estrutura básica do projeto
less
Copiar
Editar
src/
├── components/
│   └── ProtectedRoute.tsx  // Componente que protege rotas privadas
├── pages/
│   ├── Home.tsx            // Página protegida
│   └── Login.tsx           // Página de login
├── services/
│   └── firebase.ts         // Configuração do Firebase
├── App.tsx
└── main.tsx
🔧 Como rodar o projeto
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Instale as dependências:

bash
Copiar
Editar
npm install
Configure o Firebase:

Crie um projeto no Firebase

Ative a autenticação com Email/Senha

Copie suas credenciais e adicione no arquivo firebase.ts

Rode o projeto:

bash
Copiar
Editar
npm run dev

