import React, { useState, useEffect } from "react";
import profile1 from "../../assets/profile-images/Ellipse -3.png"
import "./payroll_form.css";
import { useParams, Link, withRouter } from "react-router-dom";
import EmployeeService from "../../services/employee-service";
import Header from "../header/header";

const PayrollForm = props => {
  let initialValue = {
    name: "",
    profileArray: [
      { url: "../../assets/profile-images/Ellipse -3.png" },
      { url: "../../assets/profile-images/Ellipse 1.png" },
      { url: "../../assets/profile-images/Ellipse -8.png" },
      { url: "../../assets/profile-images/Ellipse -7.png" }
    ],
    allDepartment: ["HR", "Sales", "Finance", "Engineer", "Others"],
    departmentValue: [],
    gender: "",
    salary: "40000",
    day: "1",
    month: "Jan",
    year: "2020",
    startDate: "",
    notes: "",
    id: "",
    profileUrl: "",
    isUpdate: false,
    error: {
      department: "",
      name: "",
      gender: "",
      salary: "",
      profileUrl: "",
      startDate: ""
    }
  };
  const [formValue, setForm] = useState(initialValue);
  const params = useParams();
  let employeeService = new EmployeeService();

  useEffect(() => {
    if (params.id) {
      getDataById(params.id);
    }
  }, []);

  const getDataById = (id) => {
    employeeService
      .getEmployee(id)
      .then((data) => {
        console.log("data is ", data.data);
        let obj = data.data;
        setData(obj);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  const setData = (obj) => {
    let array = obj.startDate.split(" ");
    setForm({
      ...formValue,
      ...obj,
      profileUrl: obj.profileUrl,
      departmentValue: obj.department,
      isUpdate: true,
      day: array[0],
      month: array[1],
      year: array[2],
    });
  };


  let handleChange = event => {
    setForm({ ...formValue, [event.target.name]: event.target.value })
  };

  let validFormData = async () => {
    let isError = false;
    let error = {
      department: '',
      name: '',
      gender: '',
      salary: '',
      profileUrl: '',
      startDate: ''
    }
    if (formValue.name.length < 1) {
      error.name = 'name is required field'
      isError = true;
    }
    if (formValue.gender.length < 1) {
      error.gender = 'gender is required field'
      isError = true;
    }
    if (formValue.salary.length < 1) {
      error.salary = 'salary is required field'
      isError = true;
    }
    if (formValue.profileUrl.length < 1) {
      error.profileUrl = 'profile is required field'
      isError = true;
    }

    if (formValue.departmentValue.length < 1) {
      error.department = 'department is required field'
      isError = true;
    }
    await setForm({ ...formValue, error: error })
    return isError;
  };

  const onCheckChange = (name) => {
    let index = formValue.departmentValue.indexOf(name);

    let checkArray = [...formValue.departmentValue]
    if (index > -1)
      checkArray.splice(index, 1)
    else
      checkArray.push(name);
    setForm({ ...formValue, departmentValue: checkArray });
  }
  const getChecked = (name) => {
    return formValue.departmentValue && formValue.departmentValue.includes(name);
  }

  let handleSubmit = event => {
    event.preventDefault();
    // if(await validFormData()){
    //   console.log("error", formValue);
    //   return;
    // }
    let employee = {
      name: formValue.name,
      department: formValue.departmentValue,
      gender: formValue.gender,
      salary: formValue.salary,
      startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
      notes: formValue.notes,
      id: formValue.id,
      profileUrl: formValue.profileUrl,
    };
    console.log(employee);
    if (formValue.isUpdate == true) {
      employeeService.updateEmployee(employee).then(data => {
        console.log("updated successfully");
      }).catch(err => {
        console.log("error in updation is ", err);
      })
    } else {
      employeeService.addEmployee(employee).then(data => {
        console.log("data added");
      }).catch(err => {
        console.log("err while add");
      })
    }
  }

  const reset = () => {
    setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });

    console.log(formValue);
  }

  return (
    <div className="payroll-form">
      <Header/>
      <div className="content">
        <form className="form" action="#" onSubmit={handleSubmit}>
          <div className="form-head">Employee Payroll form</div>
          <div className="row">
            <label className="label text" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              placeholder="Your name.."
              required
            />
          </div>
          <div className="error"> {formValue.error.name} </div>
          <div className="row">
            <label className="label text" htmlFor="profileUrl">
              Profile image
            </label>
            <div className="profile-radio-button">
              <label>
                <input
                  type="radio"
                  checked={
                    formValue.profileUrl ===
                    "../../assets/profile-images/Ellipse -3.png"
                  }
                  name="profileUrl"
                  value="../../assets/profile-images/Ellipse -3.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile1} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="profileUrl"
                  checked={
                    formValue.profileUrl ===
                    "../../assets/profile-images/Ellipse 1.png"
                  }
                  value="../../assets/profile-images/Ellipse 1.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile1} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="profileUrl"
                  checked={
                    formValue.profileUrl ===
                    "../../assets/profile-images/Ellipse -8.png"
                  }
                  value="../../assets/profile-images/Ellipse -8.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile1} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="profileUrl"
                  checked={
                    formValue.profileUrl ===
                    "../../assets/profile-images/Ellipse -7.png"
                  }
                  value="../../assets/profile-images/Ellipse -7.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile1} alt="profile" />
              </label>
            </div>
          </div>
          <div className="error"> {formValue.error.profileUrl} </div>
          <div className="row">
            <label className="label text" htmlFor="gender">
              Gender
            </label>
            <div>
              <input
                type="radio"
                id="male"
                checked={formValue.gender === "male"}
                onChange={handleChange}
                name="gender"
                value="male"
                required
              />
              <label className="text" htmlFor="male">
                Male
              </label>
              <input
                type="radio"
                id="female"
                checked={formValue.gender === "female"}
                onChange={handleChange}
                name="gender"
                value="female"
              />
              <label className="text" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <div className="error"> {formValue.error.gender} </div>

          <div className="row">
            <label className="label text" htmlFor="department">
              Department
            </label>
            <div>
              {formValue.allDepartment.map(item => (
                <span key={item}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => onCheckChange(item)}
                    name={item}
                    checked={getChecked(item)}
                    value={item}
                  />
                  <label className="text" htmlFor={item}>
                    {item}
                  </label>
                </span>
              ))}
            </div>
          </div>
          <div className="error"> {formValue.error.department} </div>

          <div className="row">
            <label className="label text" htmlFor="salary">
              Salary
            </label>
            <input
              className="input"
              type="range"
              onChange={handleChange}
              id="salary"
              value={formValue.salary}
              name="salary"
              placeholder="Salary"
              min="30000"
              max="50000"
              step="100"
            />  {formValue.salary}
          </div>
          <div className="error"> {formValue.error.salary} </div>

          <div className="row">
            <label className="label text" htmlFor="startDate">
              Start Date
            </label>
            <div>
              <select
                value={formValue.day}
                onChange={handleChange}
                id="day"
                name="day"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select
                value={formValue.month}
                onChange={handleChange}
                id="month"
                name="month"
              >
                <option value="Jan">January</option>
                <option value="Feb">Febuary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="Aug">August</option>
                <option value="Sept">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
              <select
                value={formValue.year}
                onChange={handleChange}
                id="year"
                name="year"
              >
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
              </select>
            </div>
          </div>
          <div className="error"> {formValue.error.startDate} </div>

          <div className="row">
            <label className="label text" htmlFor="notes">
              Notes
            </label>
            <textarea
              onChange={handleChange}
              id="notes"
              value={formValue.notes}
              className="input"
              name="notes"
              placeholder=""
              style={{ height: "100%" }}
            />
          </div>

          <div className="buttonParent">
            <Link to="/home" className="resetButton button cancelButton">
              Cancel
            </Link>

            <div className="submit-reset">
              <button type="submit"
                className="button submitButton"
                id="submitButton"
              >
                {formValue.isUpdate ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                className="resetButton button"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default withRouter(PayrollForm);
