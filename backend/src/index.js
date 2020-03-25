import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);


/**
 * 
 * Metódos HTTP:
 * 
 * GET: Buscar/listar uma informação no back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /**
  * 
  * Tipos de parametros:
  * 
  * - Query Params: Parametros nomeados enviados na rota após "?" servem para (Filtros, paginação): /users?nome=Rodolfo&idade=25
  * Para acessar o Query Params:
  * req.query
  * 
  * 
  * - Route Params: Parametros para identificar recursos
  * Montar no node: /users/:id (o dois pontos ":" é necessário)
  * Como acessar:
  * req.params
  * No caso acima ficará 
  * req.params.id
  * 
  * - Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  * Como enviar:
  * {"nome": "Rodolfo", "idade": 25}
  * 
  * como obter:
  * 
  * req.body
  * 
  * Porém é necessário informar ao express que o formato utilizado será json para que ele converta para o formato de objeto javascript:
  * app.use(express.json());
  * 
  */

app.post('/users', (req, res) => {
    return res.json({
        event: 'Semana Omnistack',
        aluno: 'Rodolfo'
    });
});

app.listen(3333);