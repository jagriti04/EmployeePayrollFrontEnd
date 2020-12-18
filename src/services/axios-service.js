const axios = require("axios").default;

class AxiosService {
  getService(url = "", tokenRequired = false, httpOptions = null) {
    return axios.get(url, tokenRequired && httpOptions);
  }

  postService(url = "", payload = null, tokenRequired = false, httpOptions = null) {
    return axios.post(url, payload, tokenRequired && httpOptions);
  }
}

module.exports = new AxiosService();
