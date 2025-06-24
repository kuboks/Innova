import { Router } from 'express';

const loginRoutes = Router()

import { 
    postLogin,
    postNewUser,
    authSession,
    logout, 
    postForgotPassword,
    postNewPassword

} from '../controllers/session.controller.js';

loginRoutes.post('/login', postLogin);

loginRoutes.post('/signup', postNewUser);

loginRoutes.get("/session", authSession);

loginRoutes.post("/logout", logout);

loginRoutes.post("/forgot-password", postForgotPassword);

loginRoutes.post("/new-password", postNewPassword);

export default loginRoutes