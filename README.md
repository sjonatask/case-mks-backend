# CASE MKS BACKEND

Neste repositório foi feito uma CRUD de um catálogo de filmes como um challenge para a MKS

## Tecnologias Utilizadas

 1. Typescript
 2. Node.js
 3. Bcryptjs
 4. TypeORM
 5. Express
 6. Uuid
 7. Jsonwebtoken
 8. Dotenv
 9. Mysql 
 10. Swagger
 
 

> **Observações:**
>  1. Este foi meu primeiro projeto/primeiro contato com o TypeORM, tentei fazer tabelas relativas, mas acabei não conseguindo fazer, a tempo de entrega, a relação das tabelas dos filmes favoritos com a tabela dos usuários e não consegui fazer o migration, então acabei criando as tabelas por uma extensão que tenho do MySql no vscode.
>  
> 2. Olhei as tecnologias requeridas e vi nestjs, mas por um erro meu acabei confundido e utilizei o nodejs para a confecção deste challenge.

## Tabelas Criadas

```sql
CREATE TABLE IF NOT EXISTS MKS_USERS (
	id VARCHAR(255) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(10) NOT NULL DEFAULT "NORMAL"
);

CREATE TABLE IF NOT EXISTS MKS_MOVIE (
	id VARCHAR(255) PRIMARY KEY,
	title VARCHAR(80) NOT NULL,
	description VARCHAR(255),
	duration_in_minutes INT NOT NULL,
	year_of_release INT NOT NULL
);

CREATE TABLE IF NOT EXISTS MKS_FAVORITE_MOVIE (
	id VARCHAR(255) PRIMARY KEY,
	user_id VARCHAR(255) NOT NULL,
	movie_id VARCHAR(255) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES MKS_USERS(id),
	FOREIGN KEY (movie_id) REFERENCES MKS_MOVIE(id)
);
```
## Endpoints Criados 

 - [x] Signup do usuário
 - [x] Login do usuário
 - [x] Adcionar filme ao catalogo --> apenas admin
 - [x] Edita filme informação do filme --> apenas admin
 - [x] Excluir filme do catalogo --> apenas admin
 - [x] Pegar lista de todos os filmes 
 - [x] Adcionar filme favorito do usuario
 - [x] Deletar filme favorito do usuario
 - [ ] Pegar lista de filmes favoritos do usuario*
 

> **Observação**
> - Não consegui fazer o left join da tabela de filme para a a tabela de filmes favoritos

## Documentação

https://documenter.getpostman.com/view/18694716/UzJQrEuc
