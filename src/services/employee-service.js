import config from "../config/config";
import AxiosService from "./axios-service.js";

export default class EmployeeService {
  baseUrl = config.baseUrl;
  getEmployees() {
    return AxiosService.getService(`${this.baseUrl}employeepayrollservice/employees-list`);
  }

  getEmployee(id) {
    return AxiosService.getService(`${this.baseUrl}employeepayrollservice/employee/${id}`);
  }

  addEmployee(data) {
    return AxiosService.postService(`${this.baseUrl}employeepayrollservice/register-employee`, data);
  }

  updateEmployee(data) {
    console.log(data.id);
    return AxiosService.putService(`${this.baseUrl}employeepayrollservice/update-employee/${data.id}`,data);
  }

  deleteEmployee(id) {
    return AxiosService.deleteService(`${this.baseUrl}employeepayrollservice/remove-employee/${id}`);
  }
}
