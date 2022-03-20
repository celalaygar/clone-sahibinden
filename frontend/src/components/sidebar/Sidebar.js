import './simple-sidebar.css';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoComponent from '../LogoComponent';
import * as ROLE from '../../constant/roleConstant';


const SideBarMenu = props => {
  const { isLoggedIn, role } = useSelector(store => {
    return {
      isLoggedIn: store.isLoggedIn,
      username: store.username,
      role: store.role
    };
  });
  const [triggerUseEffect, setTriggerUseEffect] = useState('initial');

 

  // useEffect(() => {
  // }, [triggerUseEffect])

  let links;
  if (isLoggedIn && role === ROLE.ROLE_ADMIN) {
    links = (
      <nav id="sidebar" >
        <ul className="list-unstyled components" >
          <li className={triggerUseEffect === "index" && "active"}> <Link to="/index" onClick={() => setTriggerUseEffect('index')}> <FontAwesomeIcon className="fa-sm" icon="home"></FontAwesomeIcon>&nbsp;&nbsp; Anasayfa</Link> </li>
          <li className={triggerUseEffect === "search-user" && "active"}> <Link to="/search-user" onClick={() => setTriggerUseEffect('search-user')}> <FontAwesomeIcon className="fa-sm" icon="user-circle"></FontAwesomeIcon>&nbsp;&nbsp; Personel İşlemleri</Link> </li>
          <li className={triggerUseEffect === "search-company" && "active"} > <Link to="/search-company" onClick={() => setTriggerUseEffect('search-company')}><FontAwesomeIcon icon="minus"></FontAwesomeIcon>&nbsp;&nbsp; Şirket İşlemleri</Link> </li>
          <li id="menu-li">
            <a href="#homeSubmenu2"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle menu-toggle"><FontAwesomeIcon className="fa-sm" icon="users"></FontAwesomeIcon>&nbsp;&nbsp;Müşteri İşlemleri</a>
            <ul className="collapse list-unstyled" id="homeSubmenu2">
              <li className={triggerUseEffect === "search-company" && "active"} > <Link to="/search-company" onClick={() => setTriggerUseEffect('search-company')}><FontAwesomeIcon icon="minus"></FontAwesomeIcon>&nbsp;&nbsp; Şirket İşlemleri</Link> </li>
              <li className={triggerUseEffect === "search-customer" && "active"}> <Link to="/search-customer" onClick={() => setTriggerUseEffect('search-customer')}><FontAwesomeIcon icon="minus"></FontAwesomeIcon>&nbsp;&nbsp; Müşteri İşlemleri</Link> </li>
              <li className={triggerUseEffect === "search-customer-orders" && "active"}> <Link to="/search-customer-orders" onClick={() => setTriggerUseEffect('search-customer-orders')}><FontAwesomeIcon className="fa-sm" icon="minus"></FontAwesomeIcon>&nbsp;&nbsp;&nbsp;Sipariş İşlemleri</Link> </li>
            </ul>
          </li>
          <li className={triggerUseEffect === "reporting-page" && "active"}> <Link to="/reporting-page" onClick={() => setTriggerUseEffect('reporting-page')}><FontAwesomeIcon className="fa-sm" icon="chart-line"></FontAwesomeIcon>&nbsp;&nbsp; Raporlama İşlemleri</Link> </li>
          <li className={triggerUseEffect === "contact-page" && "active"}> <Link to="/contact-page" onClick={() => setTriggerUseEffect('contact-page')}><FontAwesomeIcon className="fa-sm" icon="phone"></FontAwesomeIcon>&nbsp;&nbsp; İletişim</Link> </li>
          <li className={triggerUseEffect === "info-page" && "active"}> <Link to="/info-page" onClick={() => setTriggerUseEffect('info-page')}><FontAwesomeIcon className="fa-sm" icon="question-circle"></FontAwesomeIcon>&nbsp;&nbsp; Bilgi</Link> </li>
        </ul>
      </nav>
    );
  };
  
  if (isLoggedIn && role === "USER") {
    links = (
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li> <Link to="/index">Anasayfa</Link> </li>

          <li> <Link to="/index">İletişim</Link> </li>
        </ul>
      </nav>
    );
  };
  
  
  return (
    <div className="text-white " id="sidebar-wrapper">
      <div className="sidebar-heading ml-auto">
        <LogoComponent />
      </div>
      <div className="list-group ">
        {links}
      </div>
    </div>
  )
}
export default SideBarMenu;