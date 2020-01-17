import { Router } from 'express'

import * as passwordController from '../controller/password.controller'
import authMiddleware from '../middleware/auth.middleware'

const router = Router()

router.use(authMiddleware)

router.get('/list', passwordController.getUserPasswords)
router.post('/detail', passwordController.getDetailUserPassword)
router.post('/add', passwordController.addNewPassword)
router.patch('/edit', passwordController.editPasswordData)
router.delete('/delete/:account', passwordController.deletePasswordData)

export default router