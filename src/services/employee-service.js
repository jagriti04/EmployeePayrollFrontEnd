import config from "../config/config";
import AxiosService from "./axios-service.js";

export default class EmployeeService {
  baseUrl = config.baseUrl;
  getEmployees() {
    return AxiosService.getService(`${this.baseUrl}employeepayrollservice/getlist`);
  }

  getEmployee(id) {
    return AxiosService.getService(`${this.baseUrl}employeepayrollservice/get/${id}`);
  }

  addEmployee(data) {
    return AxiosService.postService(`${this.baseUrl}employeepayrollservice/create`, data);
  }

  updateEmployee(data) {
    console.log(data.id);
    return AxiosService.putService(`${this.baseUrl}employeepayrollservice/update/${data.id}`,data);
  }

  deleteEmployee(id) {
    return AxiosService.deleteService(`${this.baseUrl}employeepayrollservice/delete/${id}`);
  }
}
