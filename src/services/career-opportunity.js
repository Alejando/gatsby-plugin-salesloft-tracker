import axios from 'axios'
const service_url = process.env.MYDL_API_URL;

class CareerOpportunity {
  static getCareers() {
    return axios.get(service_url + "/career_opportunities");
  }
}

export default CareerOpportunity;
