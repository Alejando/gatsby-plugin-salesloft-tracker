import axios from 'axios'
import { formDataFrom }  from '../helpers/form-data-helper'

export function apply(values, careerSlug) {
  const endPoint = process.env.MYDL_API_URL + '/career_opportunities/' + 
              careerSlug + '/apply';

  return axios({
    method: 'post',
    url: endPoint,
    data: formDataFrom(values),
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    return response.data['message']
  })
  .catch( error => {
    throw new Error(error.response.data['error'])
  })
}

export function referAFriend(values, careerSlug) {
  const endPoint = process.env.MYDL_API_URL + '/career_opportunities/' + 
              careerSlug + '/refer';

  return axios({
    method: 'post',
    url: endPoint,
    data: formDataFrom(values),
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    return response.data['message']
  })
  .catch( error => {
    throw new Error(error.response.data['error'])
  })
}
