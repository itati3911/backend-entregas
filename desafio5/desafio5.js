const express = require('express')
const handlebars = require('express-handlebars')
const Contenedor = require('./contenedor')

const app = express()
app.set('views', './views')


//EJS
app.set('view engine', 'ejs')

//MIDDLEWARE
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Instancia Contenedor
const contenedor = new Contenedor('./productos.txt')



app.get('/productos', async (req, res) => {
    try{
      contenedor.getAll().then(resp =>
        res.render('./ejs/main',{productos: resp, prodExists: resp.length !==0})
      )
    }catch (e) {
      res.send(e)
    }
})

app.post('/productos', async (req, res) => {
  try{
    const producto = req.body
    await contenedor.save(producto)
    res.redirect('/productos')
  }catch (e) {
    res.send(e)
  }
})

//SERVER
const PORT = 8080
app.listen(PORT, () => {
  console.log('Servidor Inciando en el puerto ' + PORT)
})

