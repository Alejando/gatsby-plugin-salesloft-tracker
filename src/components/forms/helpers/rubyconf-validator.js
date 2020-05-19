import * as Yup from 'yup'

export const RubyconfSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Your name must be longer than 2 characters')
    .required('Please specify your name'),
  last_name: Yup.string()
    .min(2, 'Your last name must be longer than 2 characters')
    .required('Please specify your last name'),
  email: Yup.string()
    .email('Please enter a valid email address e.g. name@domain.com')
    .required('We need your email address to contact you'),
  my_main_job_description: Yup.string()
    .required('We would like to know about you')
})