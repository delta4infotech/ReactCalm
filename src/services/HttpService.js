import axios from "axios";

const HttpService = {
  postRequest: (API, DATA) => {
    return axios.post(API, DATA);
  },

  getRequest: (API, DATA) => {
    return axios.get(API, DATA);
  }
};

export { HttpService };
