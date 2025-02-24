# Projeto Movie Runner

Bem-vindo ao repositório do projeto Movie Runner

## Sobre o Projeto

Sistema de recomendação de filmes baseado em aprendizado de máquina. Um usuário é perguntado ao ter sua conta criada sobre quais seus estilos favoritos de filmes, assim como possíveis filmes. Ao possuir essa informação, uma LLM realiza a recomendação por filtros colaborativos, baseados  nas interações dos usuários (como avaliações e histórico de visualização) para identificar padrões de comportamento. Usuários com gostos similares recebem recomendações parecidas.


## Acesse o Protótipo no Figma

Clique no link abaixo para acessar o protótipo do projeto no Figma:
[Link para o Figma](https://www.figma.com/design/mCsVJgPCh9HXkKj9TPgyyP/Telas?node-id=0-1&t=guzpg4qpXtthaKvo-1)


## Rodando projeto backend

1. Entre na pasta backend
2. Crie um arquivo chamado ".env" na raiz do projeto (use o arquivo .env.example como exemplo)
3. Preencha as variáveis do .env com suas credencias
4. Rode `npm install` para instalar as dependências do projeto
5. Rode `npm run start` para inicializar a aplicação
6. Rode o banco de dados postgres na sua máquina ou no docker
7. Pelo terminal entre no postgres e rode o arquivo dump.sql para preencher o banco de dados com as informações necessárias


## Rodando projeto frontend

1. Entre na pasta frontend
2. Rode `npm install` para instalar as dependências do projeto
3. Rode `npm run dev` para inicializar a aplicação