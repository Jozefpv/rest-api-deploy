const z = require('zod')

const movieSchema = z.object({
    titulo: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    genero: z.array(
        z.enum(['Drama', 'Romance', 'Crimen', 'Ficcion', 'Aventura']), {
            required_error: 'Movie genre is required'
        }
    ),
    duracion: z.number().int().positive(),
    director: z.string().default('Desconocido'),
    año: z.number().int(),
    sinopsis: z.string()
})

function validateMovie (object) {
    return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}