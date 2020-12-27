import React from "react";
import Display from "./display/display";
import Header from "../header/header";
import EmployeeService from "../../services/employee-service";
import addUser from "../../assets/icons/add-24px.svg";
import searchIcon from "../../assets/icons/search.png";
import { Link } from "react-router-dom";
import "./payroll_home.css";

class PayrollHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchExpand: false,
      employeeArray: [],
      AllEmployeeArray: []
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
          AllEmployeeArray: data.data,
        });
      })
      .catch(err => {
        console.log("err after ", err);
      });
  };

  search = async (event) => {
    let search = event.target.value;

    await this.setState({ employeeArray: this.state.AllEmployeeArray });
    let empArray = this.state.employeeArray;
    if (search.trim().length > 0)
      empArray = empArray.filter(
        (element) =>
          element.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );

    this.setState({ employeeArray: empArray });
  };

  render() {
    return (
      <div className="home">
        <Header />
        <div className="main-content">
          <div className="header-content">
            <div className="emp-text ">
              Employee Details <div className="emp-count"> </div>
            </div>
            <div className="search-add-div">
              <div className="search-box" onClick={this.openSearch}>
                <input
                  className="search-input"
                  onChange={this.search}
                  type="text"
                />
                <img className="search-icon" src={searchIcon} alt="" />
              </div>
              <Link to="form" className="add-button">
                <img src={addUser} alt="add" /> Add User
            </Link>
            </div>

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
