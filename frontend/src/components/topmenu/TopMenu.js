
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/AuthenticationAction';
import ApiService from '../../services/base/ApiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './TopMenu.css';


const TopMenu = props => {
    const { isLoggedIn, username, role } = useSelector(store => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            role: store.role
        };
    });
    const dispatch = useDispatch();



    const onLogout = async () => {

        try {
            await ApiService.logout();
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }

        ApiService.changeAuthToken(null);
        dispatch(logoutAction());
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
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto p-1">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/index">Anasayfa </Link>
                        </li>
                        <li className="nav-item dropdown  pl-1">
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
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto ">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/index">Anasayfa </Link>
                        </li>
                        <li className="nav-item dropdown  pl-1">
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