import * as Yup from 'yup'

const SUPPORTED_FORMATS = [
  "application/pdf",
  "application/zip",
  "application/word",
  "application/html",
  "application/docx"
]

export const CareerSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Your name must be longer than 2 characters')
    .required('Please specify your first name'),
  last_name: Yup.string()
    .min(2, 'Your last name must be longer than 2 characters')
    .required('Please specify your last name'),
  email: Yup.string()
    .email('Please enter a valid email address e.g. name@domain.com')
    .required('We need your email address to contact you'),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .required('We need your phone number to contact you'),
  linkedin_url: Yup.string()
    .url("That doesn't look like a url"),
  url: Yup.string()
    .url("That doesn't look like a url"),
  cv: Yup.mixed()
    .required('The CV is required')
    .test('fileType', "Unsupported File Format", value => (typeof value === 'undefined' ? true : SUPPORTED_FORMATS.includes(value.type)) )
})
