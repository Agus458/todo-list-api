import { Request, Response } from 'express'
import { getRepository, getManager } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { Message } from './Message'
import { Todo } from './entities/Todo'

export const createUser = async (request: Request, response: Response): Promise<Response> => {

    // Validate the data recived from the user
    if (!request.body.nick) {
        let message: Message = {
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
        let message: Message = {
            message: "Nick already exists",
            status: 400
        }
        response.status(message.status);
        return response.json(message);
    }

    // Creates the new User if the validation is corrct
    let newUser = getRepository(User).create({
        nick: request.body.nick
    });

    let result = await getRepository(User).save(newUser);

    let message: Message = {
        message: "User created correctly",
        status: 201,
        response: result
    }
    response.status(message.status);

    return response.json(message);
}

export const getUsers = async (request: Request, response: Response): Promise<Response> => {
    const users = await getRepository(User).find(); // Bring all the users from the database

    let message: Message = {
        message: "Users requested correctly",
        status: 200,
        response: users
    }

    if (users.length == 0) {
        message.message = "No users in the database";
    }

    response.status(message.status);
    return response.json(message);
}

export const getUserByNick = async (request: Request, response: Response): Promise<Response> => {
    // Validation
    if (!request.params.nick) {
        let message: Message = {
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
        },
        relations: ['todos']
    });

    if (!user) {
        let message: Message = {
            message: "No user with this nick",
            status: 200
        }
        response.status(message.status);
        return response.json(message);
    }

    let message: Message = {
        message: "User requested correctly",
        status: 200,
        response: user
    }
    response.status(message.status);
    return response.json(message);
}

export const deleteUser = async (request: Request, response: Response): Promise<Response> => {

    // Parameters validation
    if (!request.params.nick) {
        let message: Message = {
            message: "Missing parameters",
            status: 400
        }
        response.status(message.status);

        return response.json(message);
    }

    const user = await getRepository(User).findOne({
        where: { nick: request.params.nick }
    });

    let message: Message = {
        message: "No users to remove",
        status: 200
    }
    response.status(message.status);

    if (user) {
        const result = await getRepository(User).delete({
            nick: request.params.nick
        });

        message.response = result;
        message.message = "User removed successfuly";

        return response.json(message);
    }

    return response.json(message);
}

export const updateUser = async (request: Request, response: Response): Promise<Response> => {
    // validation of todos list and user nick
    if (!request.params.nick || !request.body.todos) {
        let message: Message = {
            message: "Missing nick parameter or todos list in body",
            status: 400
        }
        response.status(message.status);

        return response.json(message);
    }

    // vlidate that user is registered in the database
    let user = await getRepository(User).findOne({
        where: { nick: request.params.nick }
    });

    if (!user) {
        let message: Message = {
            message: "User is not registered in the database",
            status: 400
        }
        response.status(message.status);

        return response.json(message);
    }

    request.body.todos.forEach((todo: { label: string, done: boolean }) => {
        if (todo.label) {
            let newTodo: Todo = getRepository(Todo).create({
                label: todo.label,
                done: todo.done,
                user: user
            });
            getRepository(Todo).save(newTodo);
        }
    });

    let message: Message = {
        message: "Tasks saved succesfuly",
        status: 201
    }
    response.status(message.status);

    return response.json(message);
}