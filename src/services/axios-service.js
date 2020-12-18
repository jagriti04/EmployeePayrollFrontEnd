const axios = require("axios").default;

class AxiosService {
  getService(url) {
    return axios.get(url);
  }

  postService(url, data) {
    return axios({
      method: 'post',
      url: url,
      data: data
    })
  }
  putService(url, data) {
    return axios({
      method: 'put',
      url: url,
      data: data
    })
  }
}

module.exports = new AxiosService();
