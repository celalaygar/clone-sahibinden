
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ApiService from '../../services/base/ApiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './TopMenu.css';
import { logoutAsync, selectedAuthentication } from '../../redux/redux-toolkit/authentication/AuthenticationSlice';


const TopMenu = props => {
    const selectedAuth = useSelector(selectedAuthentication);
    const { isLoggedIn, username, role } = selectedAuth;

    const [navbarClassName, setNavbarClassName] = useState("navbar-toggler collapsed");
    const [ariaExpanded, setAriaExpanded] = useState("false");
    const [navbarTargetDivClassName, setNavbarTargetDivClassName] = useState("navbar-collapse collapse");

    const dispatch = useDispatch();

    const onclickNavbar = (event) => {
        event.preventDefault();
        console.log(0)
        if (navbarClassName.includes("collapsed")) {
            console.log(1)
            setNavbarClassName("navbar-toggler");
            setAriaExpanded("false");
            setNavbarTargetDivClassName("navbar-collapse collapse");
        } else {
            setNavbarClassName("navbar-toggler collapsed");
            setAriaExpanded("true");
            setNavbarTargetDivClassName("navbar-collapse collapse show");
            console.log(2)
        }
    }
    const onLogout = async () => {

        try {
            await ApiService.logout();
            ApiService.changeAuthToken(null);
            await dispatch(logoutAsync(null));
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }

    }
    let links = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom ">

        </nav>
    );

    if (isLoggedIn && role === "ADMIN") {
        links = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom  pl-2">
                {isLoggedIn &&
                    <span id="menu-toggle" onClick={props.toggle} style={{ cursor: "pointer" }}>
                        {/* <MenuIconComponent width={32}  height={32}/> */}
                        <FontAwesomeIcon icon="bars" size="lg" />
                    </span>
                }
                <button
                    className={navbarClassName}
                    onClick={e => onclickNavbar(e)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={ariaExpanded}
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={navbarTargetDivClassName} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto p-1">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/index">Anasayfa </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {username}
                                </button>
                                <ul className="dropdown-menu">
                                    <li key={1}><Link className="dropdown-item" to={"/get-all-users"} >Tüm Kullanıcılar </Link></li>
                                    <li key={2}><Link className="dropdown-item" to={"/save-user"} > Üye kaydet </Link></li>
                                    <li key={3}><Link className="dropdown-item" to="/user-detail"> Hesabım </Link></li>
                                    <li key={4}><Link className="dropdown-item" to={"/update-my-account/" + username}>  Bilgilerimi Güncelle </Link></li>
                                    <li key={5}><Link className="dropdown-item" to={"/update-my-account-password/"}> Şifremi Güncelle </Link></li>
                                    <li key={6}><span className="dropdown-item" onClick={onLogout} style={{ cursor: "pointer" }}> Çıkış </span></li>

                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    } else {
        links = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                {isLoggedIn &&
                    <span id="menu-toggle" onClick={props.toggle} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon="bars" size="lg" />
                    </span>
                }
                <button
                    className={navbarClassName}
                    onClick={e => onclickNavbar(e)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={ariaExpanded}
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={navbarTargetDivClassName} id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto ">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/index">Anasayfa </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {username}
                                </button>
                                <ul className="dropdown-menu">
                                    <li key={1}><Link className="dropdown-item" to="/user-detail"> Hesabım </Link></li>
                                    <li key={2}><Link className="dropdown-item" to={"/update-my-account/" + username}> Bilgilerimi Güncelle </Link></li>
                                    <li key={3}><Link className="dropdown-item" to={"/update-my-account-password/"}> Şifremi Güncelle </Link></li>
                                    <li key={4}><span className="dropdown-item" onClick={onLogout} style={{ cursor: "pointer" }}> Çıkış </span></li>
                                    <li key={5}><span className="dropdown-item" onClick={onLogout} style={{ cursor: "pointer" }}> Çıkış </span></li>

                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }


    return (
        links
    )
}
export default TopMenu;