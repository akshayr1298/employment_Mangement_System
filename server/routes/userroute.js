const express = require('express')
const { signUp, doLogin } = require('../controller/userController')


const router = express.Router()

router.post('/',signUp)
router.post('/login',doLogin)



module.exports = router