import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://api.hatchways.io/assessment/students'
})

export default instance;
