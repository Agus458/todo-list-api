
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// Route to get all users in the Data Base
router.get('/todos/user/', safe(actions.getUsers));

// Route to get a particular user by nick
router.get('/todos/user/:nick', safe(actions.getUserByNick));

// Route to create a new user in the Data Base
router.post('/todos/user/', safe(actions.createUser));

// Route to add tasks to a user
router.put('/todos/user/:nick', safe(actions.updateUser));

// Route to delete a particular user by its nick
router.delete('/todos/user/:nick', safe(actions.deleteUser));

export default router;
