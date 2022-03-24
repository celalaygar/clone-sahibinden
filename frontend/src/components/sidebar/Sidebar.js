import React, { useState } from 'react';
import './simple-sidebar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoComponent from '../LogoComponent';
import * as ICON from '../../assets/icons';
import { linkList } from '../../constant/sidebarConstant';

const SideBarMenu = () => {

  const { isLoggedIn, role } = useSelector(store => {
    return {
      isLoggedIn: store.isLoggedIn,
      username: store.username,
      role: store.role
    };
  });

  const [triggerUseEffect, setTriggerUseEffect] = useState(0);

  let links = null;
  if (isLoggedIn) {
    links = (
        <ul className="list-unstyled components" >
          { linkList.map((link)=>
              link.role.some((personRole) => personRole === role) ?
                  link.submenu.length === 0 ?
                    <li key={link.name} className={triggerUseEffect === link.name && "active"}>
                      <Link to={link.to} onClick={() => setTriggerUseEffect(link.name)}>
                        <FontAwesomeIcon className="fa-sm" icon={link.icon}/>
                        &nbsp;&nbsp; {link.name}
                      </Link>
                    </li>
                    :
                    <li key={link.name} id="menu-li">
                      <a href="#homeSubmenu2"
                         data-toggle="collapse"
                         aria-expanded="false"
                         className="dropdown-toggle menu-toggle">
                        <FontAwesomeIcon className="fa-sm" icon={link.icon}/>&nbsp;&nbsp; {link.name}</a>
                      <ul className="collapse list-unstyled" id="homeSubmenu2">
                        { link.submenu.map((link) =>
                            link.role.some((personRole) => personRole === role) ?
                                <li key={link.name} className={triggerUseEffect === link.name && "active"}>
                                  <Link to={link.to} onClick={() => setTriggerUseEffect(link.name)}>
                                    <FontAwesomeIcon className="fa-sm" icon={link.icon}/>
                                    &nbsp;&nbsp; {link.name}
                                  </Link>
                                </li>
                                : ""
                        )}
                      </ul>
                    </li>
                  : ""
          )}
        </ul>
    );
  };

  return (
    <div className="text-white " id="sidebar-wrapper">
      <div className="sidebar-heading ml-auto">
        <LogoComponent source={ICON.rent100}  width={"100px"} height={"100px"} />
      </div>
      <div className="list-group ">
          <nav id="sidebar" >
            {links}
          </nav>
      </div>
    </div>
  )
}
export default SideBarMenu;