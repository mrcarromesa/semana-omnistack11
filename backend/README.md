<h1>Iniciando com NodeJS</h1>

- Iniciar projeto:

```bash
yarn init -y
```

- Instalar o express:

```bash
yarn add express
```

- Criar um arquivo `src/index.js`

- Seguir os passos para trabalhar com o ES6 no Node.js: [Sucrase](https://github.com/mrcarromesa/sucrase)

- No arquivo `package.json`

- add caso não tenha uma entrada `"scripts":` e adicionar o seguinte:


```js
"scripts": {
  "dev": "nodemon src/index.js",
  "debug": "node --inspect-brk -r sucrase/register src/server.js"
},
```

- Em caso de dúvidas acesse o arquivo `package.json` dessa aplicação.

- Para executar a aplicação digite no terminal já na pasta do projeto:

```bash
yarn dev
```

---

<h2>Metódos e parametros HTTP</h2>

- Metódos HTTP:
- GET: Buscar/listar uma informação no back-end
- POST: Criar uma informação no back-end
- PUT: Alterar uma informação no back-end
- DELETE: Deletar uma informação no back-end


- Tipos de parametros:
  - Query Params: Parametros nomeados enviados na rota após "?" servem para (Filtros, paginação): `/users?nome=Rodolfo&idade=25`
  Para acessar o Query Params:
  `req.query`


  - Route Params: Parametros para identificar recursos
  Montar no node: `/users/:id` (o dois pontos ":" é necessário)
  Como acessar:
  `req.params`
  No caso acima ficará 
  `req.params.id`

  - Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  Como enviar:
  `{"nome": "Rodolfo", "idade": 25}`
  como obter:
  `req.body`
  Porém é necessário informar ao express que o formato utilizado será json para que ele converta para o formato de objeto javascript:
  `app.use(express.json());` logo no após iniciar o `express`

  - Request Headers: Geralmente Utilizado para autenticação, passar dados no cabeçalho da requisição.
  Como acessar:
  `req.headers`
  Ex.: `req.headers.authorization`

---

<h2>Estruturando o projeto</h2>

- Criar um arquivo chamado `src/routes.js`

- Nesse arquivo serão adicionada todas as rotas:

```js
import express from 'express';

const routes = express.Router();

routes.post('/users', (req, res) => {
  return res.json({
      event: 'Semana Omnistack',
      aluno: 'Rodolfo'
  });
});

export default routes;
```

- No arquivo `src/index.js` inserir o seguinte:

```js
app.use(routes);
```

- Importante que isso seja inserido após `app.use(express.json());`

----

<h2>Base de dados</h2>


- Bancos SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server

- Bancos NoSQL: MongoDB, CoachDB, etc

- Utilizar estrutura de Query Builder para realizar as consultas podemos utilizar:

- Criar a pasta `src/database/`

- [Knex.JS](http://knexjs.org)

- Instalação do Knex:

```bash
yarn add knex
```

- Instalação para utilizar o sqlite3:

```bash
yarn add sqlite3
```

- Criar arquivo de configuração de conexão do knex:

```bash
yarn knex init
```

- Isso irá criar o arquivo `knexfile.js`

- No arquivo `knexfile.js` configurar o acesso a base de dados sqlite:

```js
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    }
  },
```

---

<h2>Entidades</h2>

- ONG
- Incident (Caso)

<h2>Funcionalidades</h2>

- Login ONG
- Logout ONG
- Cadastrar ONG
- Cadastrar casos
- Listar casos especificos de uma ONG
- Listar todos os casos
- Deletar casos
- Entrar em contato


---

<h2>Migrations</h2>

- Criar pasta `src/database/migrations/`

- No arquivo `knexfile.js` adicionar a configuração da `migrations` juntamente com as configurações do sqlite:

```js
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
```

- Criar arquivo de migrations:

```bash
yarn knex migrate:make create_ongs
```

- A palavra: `create_ongs` é o nome da migration.

- Será criado uma arquivo de migration: `src/database/migrations/TIMESTAMP_create_ongs.js`

- Adicionar o seguinte conteudo:

```js
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
```

- Criar outra migration:

```bash
yarn knex migrate:make create_incidents
```

- Adicionar o conteúdo:

```js

exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // chave estrangeira
        table.string('ong_id');

        // referenciar chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
```

- Se precisar voltar atrás só executar o comando:

```bash
yarn knex migrate:rollback
```

- Agora trabalhar nas rotas, `src/routes.js` para realizar os comandos para manipular os dados na base de dados


---

<h2>Conexão com a base</h2>

- Criar um arquivo `src/database/connection.js` adicionar o seguinte:

```js
import knex from 'knex';
import configuration from '../../knexfile';

const connection = knex(configuration.development);

export default connection;
```

- Esse arquivo irá realziar a conexão com a base de dados development

- No arquivo routes importar o seguinte:

```js
import crypto from 'crypto';
import connection from './database/connection';
```

- O crypto é para gerar um valor criptografado que será utilizado para gerar um id.

- e na arquivo routes na inserção de uma nova ong ficará da seguinte forma:

```js
const { name, email, whatsapp, city, uf } = req.body;

const id = crypto.randomBytes(4).toString('HEX');

await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf 
});
```

---

<h2>Encapsular melhor as camadas da aplicação</h2>

- Criar a pasta `src/controllers` e para cada uma das entidades haverá um controller

- Criar o arquivo `src/controllers/OngController.js` com o seguinte conteudo:

```js
import connection from '../database/connection';
import crypto from 'crypto';

class OngController {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf 
    });

    return res.json({id});
  }
}

export default new OngController;
```

- O arquivo `src/routes.js` ficará da seguinte forma:

```js
import express from 'express';

const routes = express.Router();

import OngController from './controllers/OngController';

routes.post('/ongs', OngController.create);

export default routes;
```

----

<h2>Incidents</h2>

- Criar arquivo `src/controllers/IncidentController.js` com o conteúdo:

```js
import connection from '../database/connection';

class IncidentController {
  async create(req, res) {
      const { title, description, value } = req.body;
      const ong_id = req.headers.authorization;

      // Desestruturar o array, ou seja a primeira posição será setada para variavel id
      const [id] = await connection('incidents').insert({
          title,
          description,
          value,
          ong_id
      });

      res.json({id});
  }
}

export default new IncidentController;
```

- Atenção para desestruturação do array para definir a primeira posição para a const id: `const [id] = await connection('incidents').insert({ /**/ });`

- Atenção também no `req.headers`, será obtido valor do header da requisição.

- Adicionar o metodo `delete` ao IncidentController:

```js
async delete(req, res) {
    const { id } = req.params;
    const { authorization: ong_id } = req.headers;

    const incident = await connection('incidents').where('id',id).select('ong_id').first();

    if (incident.ong_id !== ong_id) {
        return res.status(401).json({error: 'Operation not permitted.'})
    }

    await connection('incidents').where('id', id).delete();

    //enviar resposta sem corpo
    return res.status(204).send();
}
```

- Primeiro é verificado se o caso pertence a ong que está sendo enviado pelo header, caso sim realizar a remoção.

- Atenção a essa parte `return res.status(204).send();` o código `204` é retorno sem conteúdo, dessa forma usamos o send vazio para não informar o conteúdo.

---

<h2>Listando Casos específicos de uma ONG</h2>

- Não é interessante no controller ter mais do que os principais 4 metodos principais:
  - create
  - index
  - update
  - delete

- Quando precisamos criar mais um, melhor é criar um outro controller e continuar seguindo o padrão.

- Criar o arquivo `src/controller/ProfileController.js` com o seguinte conteúdo:

```js
import connection from '../database/connection';

class ProfileController {
    async index(req, res) {
        const { authorization: ong_id } = req.headers;
        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');
        
        return res.json(incidents);
    }
}

export default new ProfileController;
```

- Lembre de adicionar a rota no arquivo `src/routes`

---

<h2>Login</h2>

- Crie o arquivo `src/controler/SessionController.js` com o seguinte conteúdo:

```js
import connection from '../database/connection';

class SessionController {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs').where('id', id).select('name').first();

        if (!ong) {
            res.status(400).json({'error': 'No ONG found with this ID'});
        }

        return res.json(ong);
    }
}

export default new SessionController;
```

- Não esqueça de adicionar a rota.

----

<h2>Paginação</h2>

- No arquivo `src/controllers/IncidentController.js` altere o metodo `index` :

```js
async index(req, res) {
    const { page = 1 } = req.query;


    // O count irá retornar um array então já iremos retornar o primeiro item utilizando [count]
    // Para evitar utilizar await depois de await juntamos todos na function Promise:
    const [[count], incidents] = await Promise.all([
        connection('incidents').count(),
        connection('incidents')
        // obter dados da tabela ongs o qual será utilizado no front-end
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        // Informar quais campos queremos recuperar
        .select(['incidents.*', 'ongs.name', 'ongs.city', 'ongs.uf', 'ongs.email', 'ongs.whatsapp'])
    ]);

    // retornar a resposta no header da resposta:

    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents);
}
```

- Algumas informações importantes estão nos comentários do código acima, favor ler com atenção.


---

<h2>CORS</h2>

Atraves dele podemos determinar quem irá acessa a aplicação.

- Instalando:

```bash
yarn add cors
```

- No arquivo `src/index.js` importar o `cors`:

```js
import cors from 'cors';
```

- Adicionar o `use` na aplicação:

```js
app.use(cors());
```

- Dessa forma qualquer aplicação front-end, em JS conseguirá acessar nossa aplicação.

- Se desejarmos limitar apenas para nossa aplicação colocamos:

```js
app.use(cors({
  origin: 'http://....'
}));
```