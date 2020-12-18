import config from "../config/config";
import AxiosService from "./axios-service.js";

export default class EmployeeService {
  baseUrl = config.baseUrl;
  getEmployees() {
    return AxiosService.getService(`${this.baseUrl}employee`);
  }

  getEmployee(id) {
    return AxiosService.getService(`${this.baseUrl}employee/${id}`);
  }

  addEmployee(data) {
    return AxiosService.postService(`${this.baseUrl}employee`, data);
  }
}
