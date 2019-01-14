import axios from 'axios'
import { sendEvent, sendPageView } from './analytics-service'

export function sendForm(values) {
  return axios.post(
    'https://formspree.io/contact@densitylabs.io',
    {
      _subject: values.company || values.name,
      name: values.name,
      email: values.email,
      subject: values.company,
      message: values.message
    }
  ).then(response => {
    if (response.data && response.data.success) {
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
