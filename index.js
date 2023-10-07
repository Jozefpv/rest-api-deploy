const express = require('express')
const morgan = require('morgan')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
const test = (req, res, next) => {
    console.log('Esto es un middleware')
    next()
}

app.use(express.json())
app.use(test)
app.use(morgan('dev'))

app.get('/', (req, res) => {
    console.log('acceso al get')
    res.json({
        nombre: 'jozef',
        edad: 23
    })
})


app.post('/movies', (req, res) => {

    const result = validateMovie(req.body)
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id == id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: "Película no encontrada" });
    }
});


app.post('/info', (req, res) => {
    const datos = req.body
    console.log(datos)
    console.log('acceso al post')
    res.send('esto va de locos')
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(404).json({message: 'Movie not found'})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})

app.listen(3000, () => {
    console.log('rulando en el puerto 3000')
})
/*const http = require('http')

const server = http.createServer((req, res) =>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hola socio')
})

server.listen(3000, ()=>{
    console.log('el puerto 3000 rula')
})*/

