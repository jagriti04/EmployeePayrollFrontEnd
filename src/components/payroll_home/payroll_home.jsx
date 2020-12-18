import React from "react";
import Display from "./display/display";
import Header from "../header/header";
import EmployeeService from "../../services/employee-service";
import addUser from "../../assets/icons/add-24px.svg"
import {Link} from "react-router-dom";
import "./payroll_home.css";

class PayrollHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchExpand: false,
      employeeArray: [ ],
    };
    this.employeeService = new EmployeeService();
  }

  componentDidMount() {
    this.getAllEmployees();
  }

  getAllEmployees = () => {
    this.employeeService
      .getEmployees()
      .then(data => {
        console.log("data after get ", data.data);
        this.setState({
          employeeArray: data.data,
        });
      })
      .catch(err => {
        console.log("err after ", err);
      });
  };

  render() {
    return (
      <div className="home">
        <Header/>
        <div className="main-content">
          <div className="header-content">
            <div className="emp-details-text">
              Employee Details <div class="emp-count"> </div>
            </div>
            <Link to="form" className="add-button">
              <img src={addUser} alt="" /> Add User
            </Link>
          </div>

          <div className="table-main">
            <Display employeeArray={this.state.employeeArray} getAllEmployees={this.getAllEmployees} />
          </div>
        </div>
      </div>
    );
  }
}

export default PayrollHome;
