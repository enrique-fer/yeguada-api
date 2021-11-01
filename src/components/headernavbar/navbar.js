import React from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
    
    const dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link-wrapper">
                <NavLink to={route} activeClassName="nav-link-active">{linkText}</NavLink>
            </div>
        );
    }

    return (
        <div className='navbar'>
            <div className="nav-link-wrapper">
                <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
                <NavLink exact to="/caballos" activeClassName="nav-link-active">Caballos</NavLink>
                <NavLink exact to="/cabeceras" activeClassName="nav-link-active">Cabeceras</NavLink>
                <NavLink exact to="/actividades" activeClassName="nav-link-active">Actividades</NavLink>

                {
                    props.loggedInStatus === "LOGGED_IN" ?
                    (<i className='fas fa-sign-out-alt'></i>) :
                    null
                }
            </div>
        </div>
    );
    
}

export default withRouter(Navbar);