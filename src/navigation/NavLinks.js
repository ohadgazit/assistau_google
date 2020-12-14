import React from 'react';
import { NavLink } from 'react-router-dom';

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
      <NavLink to="/u1/places">הרשם</NavLink>
    </li>}
    <li>
      <NavLink to="/places/new">התחבר</NavLink>
    </li>
    {/*<li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>*/}
  </ul>
};

export default NavLinks;