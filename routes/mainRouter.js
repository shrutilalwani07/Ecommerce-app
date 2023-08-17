const express = require('express')
const router = express.Router()

const userRouter = require('../routes/userRouter')
const productRouter = require('../routes/productRoutes')
const reviewRouter = require('../routes/reviewRouter')
const cardRouter = require('../routes/cardRouter')
router.use('/user', userRouter),
router.use('/product', productRouter),
router.use('/review', reviewRouter)
//router.use('/card',cardRouter)
module.exports = router
