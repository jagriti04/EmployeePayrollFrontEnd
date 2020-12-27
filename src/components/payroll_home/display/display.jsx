import React from "react";
import { Link, withRouter } from "react-router-dom";
import EmployeeService from "../../../services/employee-service";
import "./display.scss"
import profile1 from "../../../assets/profile-images/Ellipse -3.png";
import profile2 from "../../../assets/profile-images/Ellipse 1.png";
import profile3 from "../../../assets/profile-images/Ellipse -8.png";
import profile4 from "../../../assets/profile-images/Ellipse -7.png";
import edit from "../../../assets/icons/create-black-18dp.svg";
import deleteImg from "../../../assets/icons/delete-black-18dp.svg"
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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


const Display = (props) => {
  const employeeService = new EmployeeService();

  const remove = (empId) => {
    confirmAlert({
      title: 'Confirm to delete data',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log("in remove func " + empId);
            employeeService.deleteEmployee(empId)
              .then(data => {
                setOpen(true);
                props.getAllEmployees();
              }).catch(err => {
                console.log("error in deletion ", err);
              })
          }
        },
        {
          label: 'No',
          onClick: () => {
            console.log("no selected");
          }
        }
      ]
    });
  }

  const update = (empId) => {
    console.log("in update func " + empId);
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
    <div className="tableDiv">
      <table id="display" className="display">
        <tbody>
          <tr key={-1}>
            <th> Profile Image </th>
            <th> Name </th>
            <th> Gender </th>
            <th> Department </th>
            <th> Salary </th>
            <th> Start Date </th>
            <th> Actions </th>
          </tr>
          {props.employeeArray &&
            props.employeeArray.map((element, ind) => (
              <tr key={ind}>
                <td>
                  <img className="profile" src={
                    element.profile ===
                      "../../../assets/profile-images/Ellipse -3.png"
                      ? profile1
                      : element.profile ===
                        "../../../assets/profile-images/Ellipse 1.png"
                        ? profile2
                        : element.profile ===
                          "../../../assets/profile-images/Ellipse -8.png"
                          ? profile3
                          : profile4
                  } alt="profile" />
                </td>
                <td> {element.name} </td>
                <td> {element.gender} </td>
                <td>
                  {element.department &&
                    element.department.map(dept => (
                      <div className="dept-label"> {dept.department}</div>
                    ))}
                </td>
                <td> {element.salary} </td>
                <td> {element.startdate} </td>
                <td>
                  <Link to={{ pathname: `/form/${element.id}` }} >
                    <img onClick={() => update(element.id)} src={edit} alt="edit" />
                  </Link>
                  <img onClick={() => remove(element.id)} src={deleteImg} alt="delete" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Data deleted successfully!
        </Alert>
      </Snackbar>
    </div>

  );
};

export default withRouter(Display);
