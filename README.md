COMO RODAR O PROJETO BAIXADO
Instalar todas as dependencias indicada pelo package.json
### npm install

Criar a base de dados "celke" no MySQL
Alterar as credencias do banco de dados no arquivo "db/config/database.js"

Rodar o projeto usando o nodemon
### nodemon app.js

Abrir o endereço no navegador para acessar a página inicial
### http://localhost:8080



SEQUENCIA PARA CRIAR O PROJETO
Criar o arquivo package
### npm init

Gerencia as requisições, rotas e URLs, entre outra funcionalidades
### npm install --save express

Instalar a dependência de forma global, "-g" significa globalmente. Executar o comando através do prompt de comando, executar somente se nunca instalou a dependência na maquina, após instalar, reiniciar o PC.
### npm install -g nodemon

Instalar a dependência como desenvolvedor para reiniciar o servidor sempre que houver alteração no código fonte.
### npm install --save-dev nodemon

Rodar o projeto usando o nodemon
### nodemon index.js

Abrir o endereço no navegador para acessar a página inicial
### http://localhost:3001


Instalar a dependencia para usar variaveis globais
### npm install --save dotenv
Depois fazer a importação no index.js para fazer uso
### import dotenv from 'dotenv';
Depois colocar essa linha de código
### dotenv.config();

Instalar a dependencia para fazer autenticação usando JWT
### npm install jsonwebtoken




Comando SQL para criar a base de dados
### CREATE DATABASE celke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

Sequelize é uma biblioteca Javascript que facilita o gerenciamento do banco de dados SQL
### npm install --save sequelize

Instalar o drive do banco de dados
### npm install --save mysql2

Sequelize-cli interface de linha de comando usada para criar modelos, configurações e arquivos de migração para bancos de dados
### npm install --save-dev sequelize-cli

Iniciar o Sequelize-cli e criar o arquivo config
### npx sequelize-cli init

Manipular variáveis de ambiente
### npm install dotenv --save

Criar a migration da página home do conteúdo do topo 
### npx sequelize-cli migration:generate --name create-homes-tops

Criar a migration acrescentar a coluna imageTop
### npx sequelize-cli migration:generate --name alter-homes-tops-add-imagetop

Executar as migrations
### npx sequelize-cli db:migrate

Executar down - rollback - Permite que seja desfeita a migration, permitindo a gestão das alterações do banco de dados e versionamento.
### npx sequelize-cli db:migrate:undo --name nome-da-migration

Criar a Models da página home do conteúdo do topo 
### npx sequelize-cli model:generate --name HomesTops --attributes titleOneTop:string,titleTwoTop:string,titleThreeTop:string,linkBtnTop:string,textBtnTop:string,imageTop:string


Criar seeders que serve para popular as tabelas com dados ficticios para testes
### npx sequelize-cli seed:generate --name demo-homestops

Executar as seeders
### npx sequelize-cli db:seed:all

Executar uma seed
### npx sequelize-cli db:seed --seed nome-da-seed

Executar down - rollback - Permite que seja desfeita todas as seed, permitindo a gestão das alterações do banco de dados e versionamento.
### npx sequelize-cli db:seed:undo

Executar down - rollback - Permite que seja desfeita uma única seed, permitindo a gestão das alterações do banco de dados e versionamento.
### npx sequelize-cli db:seed:undo --seed nome-da-seed

Criar a Models da página home do conteúdo dos serviços 
### npx sequelize-cli model:generate --name HomesServices --attributes servTitle:string,servIconOne:string,servTitleOne:string,servDescOne:string,servIconTwo:string,servTitleTwo:string,servDescTwo:string,servIconThree:string,servTitleThree:string,servDescThree:string

Criar a Models da página home do conteúdo do serviço premium 
### npx sequelize-cli model:generate --name HomesPremiums --attributes premTitle:string,premSubtitle:string,premDesc:text,premBtn_text:string,premBtn_link:string,premImage:string

Criar a Models da situação 
### npx sequelize-cli model:generate --name SituationsAbouts --attributes nameSituation:string

Criar seeders
### npx sequelize-cli seed:generate --name demo-situationsabouts

Criar a Models da página sobre empresa
### npx sequelize-cli model:generate --name AboutsCompanies --attributes title:string,description:text,image:text,situationAboutId:integer

Criar seeders
### npx sequelize-cli seed:generate --name demo-aboutscompanies

Criar a Models da página contato do conteúdo texto 
### npx sequelize-cli model:generate --name ContentsContacts --attributes titleContact:string,descContact:string,iconCompany:string,titleCompany:string,descCompany:string,iconAddress:string,titleAddress:string,descAddress:string,iconEmail:string,titleEmail:string,descEmail:string,titleForm:string

Criar seeders
### npx sequelize-cli seed:generate --name demo-contentscontacts

Criar a Models da página contato para receber as mensagens de contato 
### npx sequelize-cli model:generate --name ContactsMsgs --attributes name:string,email:string,subject:string,content:text

Criar seeders
### npx sequelize-cli seed:generate --name demo-contentsmsgs

Validar formulário
### npm install -save yup

Permitir requisição externa
### npm install cors


--GitHUB
1 - Criar um Repositório no GitHub
- Acesse GitHub e faça login.
- Clique no botão "New repository" (Novo Repositório).
- Escolha um nome para o repositório.
- Não marque "Initialize this repository with a README", pois vamos inicializar localmente.
- Clique em "Create repository".

2 - Configurar o Git no VS Code
1 - Verique se o Git está instalado
2 - No terminal do VS Code, execute:
### git --version

Se não aparecer uma versão, baixe e instale o Git.

2 - configure seu usuário e e-mail
### git config --global user.name "SeuNome"
### git config --global user.email "seuemail@example.com"

3 - Inicializar o Repositório Local
- Abra o terminal no VS Code (CRTL + `)
- Acesse a pasta do seu projeto:
### cd caminho/do/seu/projeto
- Inicialize o Git
### git init
- Adicione os arquivos ao controle de versão:
### git add .
- Faça o primeiro commit:
### git commit -m "Primeira commit"
- Agora, conecte seu repositório local ao GitHub:
- Copie o link do repositório no GitHub (ele aparece depois de criar o repositório).Ex:
### https://github.com/seuusuario/seu-repositorio.git
- No terminal do VS Code, adicione o repositório remoto:
### git remote add origin https://github.com/seuusuario/seurepositorio.git
- Verifique se o remoto foi adicionado corretamente:
### git remote -v
- Deve aparecer algo como:
### origin  https://github.com/seuusuario/seu-repositorio.git (fetch)
### origin  https://github.com/seuusuario/seu-repositorio.git (push)

5 - Enviar o Código para ao GitHub
- Agora, envie os arquivos para o repositório remoto:
### git branch -M main
### git push -u origin main
- Se for solicitado, faça login no GitHub.

Atualizar o repositório quando quiser enviar mudanças, use:
### git add .
### git commit -m "Descrição das mudanças"
### git push origin main


Arquitetura de código usada no projeto
### MVC

- Repository - faz conexão direta com o banco de dados
- Service - responsável por toda regra de negócio do projeto
- Controller - responsável pela comunicação com front-end e rotas
- Models - modelos de dados

