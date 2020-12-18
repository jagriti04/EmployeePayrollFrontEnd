import React from "react";
import Display from "./display/display";
import EmployeeService from "../../services/employee-service";
import addUser from "../../assets/icons/add-24px.svg"
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo.png";

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
        <header className="header-content header">
          <div className="logo-content">
            <img src={logo} />
            <div>
              <span className="emp-text">EMPLOYEE</span> <br />
              <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
          </div>
        </header>
        <div className="main-content">
          <div className="header-content">
            <div className="emp-details-text">
              Employee Details <div class="emp-count"> 10</div>
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
