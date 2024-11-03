import exprss from 'express';
import {signup } from '../controllers/auth.controller';
const router = exprss.Router();

router.route('/signup').post(signup);

export default router