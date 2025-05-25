import { Router } from 'express';

const loginRoutes = Router()

import { 
    postLogin,
    postNewUser,
    authSession,
    logout

} from '../controllers/session.controller.js';

loginRoutes.get('/login', postLogin);

loginRoutes.post('/signup', postNewUser);

loginRoutes.get("/session", authSession);

loginRoutes.post("/logout", logout);



export default loginRoutes