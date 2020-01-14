import { Router } from 'express'

import * as passwordController from '../controller/password.controller'

const router = Router()

router.get('/list', passwordController.getUserPasswords)
router.post('/detail', passwordController.getDetailUserPassword)
router.post('/add', passwordController.addNewPassword)
router.patch('/edit', passwordController.editPasswordData)
router.delete('/delete', passwordController.deletePasswordData)

export default router