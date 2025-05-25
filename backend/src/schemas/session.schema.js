import zod from 'zod'

const newUserSchema= zod.object({
    Nombre: zod.string({
        invalid_type_error: 'El nombre no es valido',
        required_error: 'El nombre es requerido'
    }),
    Apellidos: zod.string({
        invalid_type_error: 'Los apellidos no son validos',
        required_error: 'Los apellidos requeridos'
    }),
    NombreUsuario: zod.string({
        invalid_type_error: 'El nombre de usuario no es valido',
        required_error: 'El nombre de usuqrio es requerido'
    }),
    Email: zod.string({
        invalid_type_error: 'No es un correo valido',
        required_error: 'El correo es requerido'
    }).email(),
    Contraseña: zod.string({
        invalid_type_error: 'Constraseña no valida',
        required_error: 'La contraseña es requerida'
    })
})

const loginSchema= zod.object({
    NombreUsuario: zod.optional(zod.string({
        invalid_type_error: 'El nombre de usuario no es valido',
        required_error: 'El nombre de usuqrio es requerido'
    })),
    Email: zod.optional(zod.string({
        invalid_type_error: 'No es un correo valido',
        required_error: 'El correo es requerido'
    }).email()),
    Contraseña: zod.string({
        invalid_type_error: 'Constraseña no valida',
        required_error: 'La contraseña es requerida'
    })
})

export function validarNewUser(object){
    return newUserSchema.safeParseAsync(object)

}export function validarLogin(object){
    return loginSchema.safeParseAsync(object)
}