import axios from 'axios'
import {formDataFrom}  from '../helpers/form-data-helper'

export function sendForm(values) {
  values._subject = `${values.name} ${values.last_name}`
  
  return axios({
    method: 'post',
    url: process.env.RUBYCONF_FORM_URL,
    data: formDataFrom(values),
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then(response => {
    if (response.status !== 200) {
      console.error(response.data)
      throw new Error('Ups! something is wrong, please try again.')
    }
  })
  .catch( error => {
    console.error(error)
    throw new Error('Ups! something is wrong, please try again.')
  })
}