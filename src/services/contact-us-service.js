import axios from 'axios'
import { sendEvent, sendPageView } from './analytics-service'
import { formDataFrom }  from '../helpers/form-data-helper'

export function sendForm(values) {
  values = {
    _subject: values.company || values.name,
    name: values.name,
    email: values.email,
    subject: values.company,
    message: values.message
  }
  return axios({
      method: 'post',
      url: process.env.CONTACT_US_FORM_URL,
      data: formDataFrom(values),
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
    if (response.status === 200) {
      sendPageView({
        'page' : '/contact-us-success'
      })
      sendEvent({
        eventCategory: 'Contact',
        eventAction: 'Submit',
        eventLabel: 'Contact Us Page Form',
        eventValue: 50
      })
    } else {
      console.error('Message cannot be sent', response.data)
      throw new Error('Message cannot be sent')
    }
  })
}
