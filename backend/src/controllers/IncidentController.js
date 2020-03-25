import connection from '../database/connection';

class IncidentController {
    
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
}

export default new IncidentController;