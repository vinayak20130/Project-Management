import exprss from 'express';
import {login, signup } from '../controllers/auth.controller';
const router = exprss.Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

export default router