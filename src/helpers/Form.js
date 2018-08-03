import axios from 'axios'
import Errors from '@/helpers/Errors.js'
import store from '@/store'

class Form {
  constructor (data) {
    this.originalData = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  data () {
    let data = {}
    for (let field in this.originalData) {
      data[field] = this[field]
    }
    return data
  }

  get (url) {
    return this.submit(url, 'get')
  }

  post (url) {
    return this.submit(url, 'post')
  }

  patch (url) {
    return this.submit(url, 'patch')
  }

  delete (url) {
    return this.submit(url, 'delete')
  }

  submit (url, actionType) {
    let apiUrl = store.getters.api.apiUrl
    let apiToken = store.getters.user.api_token
    let outletId = store.getters.outlet.id
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + apiToken
    axios.defaults.headers.common['hotel-id'] = outletId
    return new Promise((resolve, reject) => {
      axios[actionType](apiUrl + url, this.data())
        .then(response => {
          this.onSuccess(response.data)
          resolve(response.data)
        })
        .catch(error => {
          this.onFail(error.response.data.errors)
          reject(error.response.data.errors)
        })
    })
  }

  onSuccess () {

  }

  onFail (errors) {
    this.errors.record(errors)
  }
}

export default Form
