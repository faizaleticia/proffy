import { Request, Response } from 'express';
import database from '../database/connection';

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await database('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.json({ total });
  }
  async create(request: Request, response: Response) {
    const userId = request.body.user_id;

    await database('connections').insert({
      user_id: userId
    });

    return response.status(201).send();
  }
}