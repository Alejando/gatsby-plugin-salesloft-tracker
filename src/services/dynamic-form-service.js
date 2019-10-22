import axios from 'axios'

export function sendForm(url, values) {
  return axios({
    method: 'post',
    url: url,
    data: values,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then(response => {
    if (response.status !== 200) {
      console.error(response.data)
      throw new Error('Ups! algo salio mal, vuelve a interntalo por favor.')
    }
  })
  .catch( error => {
    console.error(error)
    throw new Error('Ups! algo salio mal, vuelve a interntalo por favor.')
  })
}