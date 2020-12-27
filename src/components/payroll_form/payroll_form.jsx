import React, { useState, useEffect } from "react";
import profile1 from "../../assets/profile-images/Ellipse -3.png";
import profile2 from "../../assets/profile-images/Ellipse 1.png";
import profile3 from "../../assets/profile-images/Ellipse -8.png";
import profile4 from "../../assets/profile-images/Ellipse -7.png";
import "./payroll_form.css";
import { useParams, Link, withRouter } from "react-router-dom";
import EmployeeService from "../../services/employee-service";
import Header from "../header/header";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PayrollForm = props => {
  let initialValue = {
    name: "",
    profileArray: [
      { url: "../../assets/profile-images/Ellipse -3.png" },
      { url: "../../assets/profile-images/Ellipse 1.png" },
      { url: "../../assets/profile-images/Ellipse -8.png" },
      { url: "../../assets/profile-images/Ellipse -7.png" }
    ],
    allDepartment: [{"id": 1, "department": 'HR' }, { "id": 2, "department": 'Engineer' },
    { "id": 3 , "department": 'Finance'}, {"id": 4, "department": 'Sales' }, {"id": 5, "department": 'Others' }],
    departmentValue: [],
    gender: "",
    salary: "40000",
    day: "1",
    month: "Jan",
    year: "2020",
    startdate: "",
    notes: "",
    id: "",
    profile: "",
    isUpdate: false,
    error: {
      department: "",
      name: "",
      gender: "",
      salary: "",
      profile: "",
      startdate: ""
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
        console.log("in form data is ", data.data);
        let obj = data.data;
        setData(obj);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  const setData = (obj) => {
    let array = obj.startdate.split(" ");
    setForm({
      ...formValue,
      ...obj,
      profile: obj.profile,
      departmentValue: obj.department,
      isUpdate: true,
      day: array[0],
      month: array[1],
      year: array[2],
    });
  };

  let handleChange = event => {
    console.log("in on change method");
    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
      startdate: `${formValue.day} ${formValue.month} ${formValue.year}`
    });
    console.log(formValue);
    console.log("in on handle change method --- " + formValue + " " + formValue.day);
  };

  let validFormData = async () => {
    let isError = false;
    let error = {
      department: '',
      name: '',
      gender: '',
      salary: '',
      profile: '',
      startdate: ''
    }

    const selectedDate = new Date(formValue.startdate);
    if (formValue.name.length < 3) {
      error.name = 'Name length should be greater than 3'
      isError = true;
    } else if (!formValue.name.match("^([A-Z])[A-Za-z\\s]{2,}$")) {
      error.name = 'Name should be in correct format. Eg. Bill Gates'
      isError = true;
    }
    if (formValue.gender.length < 1) {
      error.gender = 'Select the gender'
      isError = true;
    }

    if (formValue.profile.length < 1) {
      error.profile = 'Select the profile picture'
      isError = true;
    }

    if (formValue.departmentValue.length < 1) {
      error.department = 'Select atleast one department';
      isError = true;
    }
    console.log(selectedDate > Date.now());
    if (selectedDate > Date.now()) {
      error.startdate = 'Date is not valid';
      isError = true;
    }
    await setForm({ ...formValue, error: error })
    return isError;
  };

  const onCheckChange = (name) => {
    console.log("..... ", formValue.departmentValue);
    let index = formValue.departmentValue.indexOf(name);
    console.log(name, " in check method--- ", index);
    let checkArray = [...formValue.departmentValue]
    console.log(" check array is --- " , formValue.departmentValue, " and ", checkArray);
    if (index > -1)
      checkArray.splice(index, 1)
    else
      checkArray.push(name);
    console.log(formValue.departmentValue);
    setForm({ ...formValue, departmentValue: checkArray });
  }
  const getChecked = (name) => {
    let isChecked = false;
    formValue.departmentValue.forEach((dept) => {
      if (dept.department === name.department) {
        isChecked = true;
      }
    });
    return formValue.departmentValue && isChecked;
  }

  let handleSubmit = async event => {
    event.preventDefault();
    if (await validFormData()) {
      console.log("error", formValue);
      return;
    }
    let employee = {
      name: formValue.name,
      department: [],
      gender: formValue.gender,
      salary: formValue.salary,
      startdate: `${formValue.day} ${formValue.month} ${formValue.year}`,
      notes: formValue.notes,
      id: formValue.id,
      profile: formValue.profile,
    };
    formValue.departmentValue.map((data) => {
      employee.department.push(data)
    });
    employee.id = params.id;
    console.log(employee);

    if (formValue.isUpdate === true) {
      employeeService.updateEmployee(employee).then(data => {
        setOpen(true);
        setTimeout( () => {
          props.history.push('/home');
        }, 2000)
      }).catch(err => {
        console.log("error in updation is ", err);
      })
    } else {
      employeeService.addEmployee(employee).then(data => {
        setOpen(true);
        setTimeout( () => {
          props.history.push('/home');
        }, 2000);
      }).catch(err => {
        console.log("err while add");
      })
    }
  }

  const reset = () => {
    setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });

    console.log(formValue);
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="payroll-form">
      <Header />
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
              placeholder="Your name..."
              required
            />
          </div>
          <div className="error"> {formValue.error.name} </div>
          <div className="row">
            <label className="label text" htmlFor="profile">
              Profile image
            </label>
            <div className="profile-radio-button">
              <label>
                <input
                  type="radio"
                  checked={
                    formValue.profile ===
                    "../../../assets/profile-images/Ellipse -3.png"
                  }
                  name="profile"
                  value="../../../assets/profile-images/Ellipse -3.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile1} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="profile"
                  checked={
                    formValue.profile ===
                    "../../../assets/profile-images/Ellipse 1.png"
                  }
                  value="../../../assets/profile-images/Ellipse 1.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile2} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="profile"
                  checked={
                    formValue.profile ===
                    "../../../assets/profile-images/Ellipse -8.png"
                  }
                  value="../../../assets/profile-images/Ellipse -8.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile3} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="profile"
                  checked={
                    formValue.profile ===
                    "../../../assets/profile-images/Ellipse -7.png"
                  }
                  value="../../../assets/profile-images/Ellipse -7.png"
                  onChange={handleChange}
                  required
                />
                <img className="profile" src={profile4} alt="profile" />
              </label>
            </div>
          </div>
          <div className="error"> {formValue.error.profile} </div>
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
                <span key={item.department}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => onCheckChange(item)}
                    name={item.department}
                    checked={getChecked(item)}
                    value={item.department}
                  />
                  <label className="text dept-text" htmlFor={item.department}>
                    {item.department}
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
            <label className="label text" htmlFor="startdate">
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
          <div className="error"> {formValue.error.startdate} </div>

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
            <Link to="/home" className="button cancelButton">
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Data added successfully!
              </Alert>
            </Snackbar>
          </div>
        </form>
      </div>
    </div>
  );
};
export default withRouter(PayrollForm);
