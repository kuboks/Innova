import { Router } from 'express';

const loginRoutes = Router()

import { 
    postLogin,
    postNewUser,
    authSession,
    logout, 
    forgotPassword

} from '../controllers/session.controller.js';

loginRoutes.post('/login', postLogin);

loginRoutes.post('/signup', postNewUser);

loginRoutes.get("/session", authSession);

loginRoutes.post("/logout", logout);

loginRoutes.post("/forgot-password", forgotPassword);



export default loginRoutes