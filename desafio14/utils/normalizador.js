import ContenedorMongoMensajes from "../contenedores/ContenedorMongoMensajes.js"
import { normalize, schema } from 'normalizr'
import mongoose from 'mongoose'

const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.utluy.mongodb.net/?retryWrites=true&w=majority"
let conexion = mongoose.connect(URL);

const mensajes = new ContenedorMongoMensajes(conexion)
const aut = await mensajes.getAllMessages()

const autoresTodos = {
    id: "100000",
    autores : aut
}

const autores = new schema.Entity('autores')

const organigrama = new schema.Entity('organigrama', {
    autor: autores,
    mensajes: [autoresTodos.autores.text]
})

const grupo = new schema.Entity('grupo', {
    autoresTodos: [organigrama]
})

import util from 'util'
import logger from "./logger.js";

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}

logger.info('Objeto normalizado')
const normalizedHolding = normalize(autoresTodos, grupo)
print(normalizedHolding)
