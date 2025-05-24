import { Router } from 'express';

const loginRoutes = Router()

import { 
    postLogin,
    postNewUser
} from '../controllers/session.controller.js';

loginRoutes.get('/login', postLogin);

loginRoutes.post('/signup', postNewUser);

export default loginRoutes