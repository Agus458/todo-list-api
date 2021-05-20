import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'

export const createUser = async (request: Request, response: Response): Promise<Response> => {

    // Validate the data recived from the user
    if (!request.body.nick) {
        let message = {
            message: "Nick value is missing",
            status: 400
        }
        response.status(message.status);
        return response.json(message);
    }

    // Validate that user is not already registered
    const user = await getRepository(User).findOne({
        where: {
            nick: request.body.nick
        }
    });

    if (user) {
        let message = {
            message: "User Already registered",
            status: 400
        }
        response.status(message.status);
        return response.json(message);
    }

    // Creates the new User if the validation is corrct
    let newUser = await getRepository(User).create({
        nick: request.body.nick
    });
    let result = await getRepository(User).save(newUser);

    let message = {
        message: "User registered correctly",
        status: 201,
        user: result
    }
    response.status(message.status);
    return response.json(message);
}

export const getUsers = async (request: Request, response: Response): Promise<Response> => {
    const users = await getRepository(User).find(); // Bring all the users from the database

    let message = {
        message: "Users requested correctly",
        status: 200,
        users: users
    }
    response.status(message.status);
    return response.json(message);
}

export const getUserByNick = async (request: Request, response: Response): Promise<Response> => {
    // Validation
    if (!request.params.nick) {
        let message = {
            message: "Missing user nick parameter",
            status: 400
        }
        response.status(message.status);
        return response.json(message);
    }

    // Search the user in the database
    const user = await getRepository(User).findOne({
        where: {
            nick: request.params.nick
        }
    });

    if (!user) {
        let message = {
            message: "No user with this nick",
            status: 200
        }
        response.status(message.status);
        return response.json(message);
    }

    let message = {
        message: "User requested correctly",
        status: 200,
        user: user
    }
    response.status(message.status);
    return response.json(message);
}