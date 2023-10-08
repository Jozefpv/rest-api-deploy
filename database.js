const mongoose = require('mongoose')

const URI = 'mongodb+srv://jozef:jozef@cluster0.trrjhin.mongodb.net/apartamentosDB?retryWrites=true&w=majority'

mongoose.connect(URI)

mongoose.connection.on('open', () =>{ 
    console.log('Basa de datos conectada')
})

mongoose.connection.on('error', (err) =>{ 
    console.log(err)
})

