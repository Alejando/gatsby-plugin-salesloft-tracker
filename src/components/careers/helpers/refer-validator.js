import * as Yup from 'yup'
import {SUPPORTED_FORMATS, MAX_FILE_SIZE} from './files';

export const ReferSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Your friend's name must be longer than 2 characters")
    .required("Please specify your friend's first name"),
  last_name: Yup.string()
    .min(2, "Your friend's last name must be longer than 2 characters")
    .required("Please specify your friend's last name"),
  email: Yup.string()
    .email('Please enter a valid email address e.g. name@domain.com')
    .required("We need your friend's email address to contact him"),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number"),
  cv: Yup.mixed()
    .test('fileType', "Unsupported file format", value => (typeof value === 'undefined' ? true : SUPPORTED_FORMATS.includes(value.type)) )
    .test('fileSize', "File size is too large (Max 10MB)", value => (typeof value === 'undefined' ? true : value.size <= MAX_FILE_SIZE)),
  linkedin_url: Yup.string()
    .url("That doesn't look like a url")
    .matches(/(linkedin\.com\/)((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$/,
      "That does't look like a LinkedIn url valid")
    .when('cv',(cv, schema) =>{
      return cv === undefined ? 
        schema.required("Please attach your friend's CV or add his Linkedin url")
      :
      schema.notRequired()
    }),
  referred_by: Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Your name must be longer than 2 characters')
      .required('Please specify your first name'),
    last_name: Yup.string()
      .min(2, 'Your last name must be longer than 2 characters')
      .required('Please specify your last name'),
    email: Yup.string()
      .email('Please enter a valid email address e.g. name@domain.com')
      .required('We need your email address to contact you'),
  }),
})
