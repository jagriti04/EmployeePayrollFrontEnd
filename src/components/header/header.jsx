import React from 'react';
import logo from "../../assets/images/logo.png";

class Header extends React.Component {
    render() {
        return (
            <header className="header-content header">
                <div className="logo-content">
                    <img src={logo} />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;