import bodyParser from 'body-parser'
import express from 'express'
import http from 'http'

import setupRouting from './routes'

const APP = new express()


APP.use(bodyParser.urlencoded({ extended: false }))
APP.use(bodyParser.json())

APP.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS,PATCH'
    )
    req.method === 'OPTIONS' ? res.send(200) : next()
})

const SERVER = http.createServer(APP)
const PORT = 1616

// set routing
setupRouting(APP)

SERVER.listen(PORT, async error => {
    console.log('Server is now running on port %s', PORT)
})