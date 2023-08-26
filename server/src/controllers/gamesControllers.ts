import { Response, Request } from "express";
import { indexController } from "./indexControllers";
import pool from "../routes/database";


class GamesControllers{
        index(arg0: string, index: any) {
            throw new Error("Method not implemented.");
        }
        public async list(req: Request, resp: Response){
            //resp.send('Games');
            //pool.query('DESCRIBE games')
            const games = await pool.query('SELECT * FROM games');
            resp.json(games);
        }

        public async getOne (req: Request, resp: Response){
            const {id} = req.params;
            const games = await pool.query('SELECT * FROM games WHERE id = ?',[id])
            //resp.json({text: 'This is a game' + req.params.id})

            if(games.length > 0){
                return resp.json(games)
            }

            resp.status(404).json({text: 'The game doesnt exist'})
        }

        public async create(req: Request, resp: Response):Promise<void>{
            console.log(req.body);
            await pool.query('INSERT INTO games set ?', [req.body]);
            resp.json({text : 'Creating a game'});
        }

        public async delete(req: Request, resp: Response){
            const {id} = req.params;
            await pool.query('DELETE FROM games WHERE id = ?',[id]);
            resp.json({ message: 'The game was deleted'});
        }

        public async update(req: Request, resp:Response){
            const {id} = req.params;
            await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
            resp.json({message: 'The game was updated'})
        }
}

const gamesControllers = new GamesControllers;
export default gamesControllers;