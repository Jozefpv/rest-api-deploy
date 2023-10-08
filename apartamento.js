const mongoose = require('mongoose')
const { Schema } = mongoose

const reservaSchema = new Schema({
    id_reserva: { type: String, required: true },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    cliente: {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        email: { type: String, required: true },
        telefono: { type: String }
    }
})

const Reserva = mongoose.model('Reserva', reservaSchema)

const apartamentoSchema = new Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    precio_noche: { type: Number, required: true },
    descripcion: { type: String },
    num_personas_max: { type: Number, required: true },
    likes: {type: Number, required: true},
    reservas: [{ type: Schema.Types.ObjectId, ref: 'Reserva' }]
})

const Apartamento = mongoose.model('Apartamento', apartamentoSchema)

module.exports = { Reserva, Apartamento }