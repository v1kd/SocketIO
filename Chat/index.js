'use strict';

import express from 'express'
import http from 'http'
import socketio from 'socket.io'

const app = express()
const appHttp = http.Server(app)
const io = socketio(appHttp)
const hello = 'Hi'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('chat', (msg) => {
        console.log(`Msg: ${msg}`)
        io.emit('chat', msg)
    })
})

appHttp.listen(3000, () => {
    console.log('Listening on Port 3000')
})
