import React from 'react';
import { NavLink } from 'react-router-dom';
import SignInPage from  "../pages/SignInPage";

import './NavLinks.css';



const NavLinks = props => {
  const [connected] = React.useState(0);

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>בית</NavLink>
    </li>
    {connected?<li>
      <NavLink to="/u1/places">איזור אישי</NavLink>
    </li>:<li>
      <NavLink to="/UserForm">הרשם</NavLink>
    </li>}
    <li>
      <NavLink to="/SignIn">התחבר</NavLink>
    </li>
    {/*<li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>*/}
  </ul>
};

export default NavLinks;