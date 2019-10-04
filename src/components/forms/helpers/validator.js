import * as Yup from 'yup'

export const TalentoSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Tu nombre debe de ser mayor a 2 caracteres')
    .required('Tu nombre es requerido'),
  last_name: Yup.string()
    .min(2, 'Tu apellido debe de ser mayor a 2 caracteres')
    .required('Tu apellido es requerido'),
  email: Yup.string()
    .email('Por favor ingresa un correo electrónico (nombre@dominio.com)')
    .required('Necesitamos un correo electrónico para poder contactarte'),
  work_as: Yup.string()
    .required('Nos gustaría saber que te interesa')
})