
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/AuthenticationAction';
import ApiService from '../../services/base/ApiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TopMenu = props => {
    const { isLoggedIn, username, role } = useSelector(store => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            role: store.role
        };
    });
    const dispatch = useDispatch();


    // useEffect(()=>{ 
    //     document.addEventListener("click", menuClickTracker)
    //     return () =>{
    //         document.removeEventListener("click",menuClickTracker);
    //     };
    // }, [isLoggedIn]);

    // const menuClickTracker =(event) =>{
    //     if(dropDownMenuArea.current === null  ||!dropDownMenuArea.current.contains(event.target)){
    //         setDropDownVisible(false)
    //     }
    // };


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
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

        </nav>
    );

    if (isLoggedIn && role === "ADMIN") {
        links = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                { isLoggedIn &&
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
                            <a href="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {username}  </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={"/get-all-users"} >Tüm Kullanıcılar </Link>
                                <Link className="dropdown-item" to={"/save-user"} > Üye kaydet </Link>
                                <Link className="dropdown-item" to="/user-detail"> Hesabım </Link>
                                <Link className="dropdown-item" to={"/update-my-account/" + username}>  Bilgilerimi Güncelle </Link>
                                <Link className="dropdown-item" to={"/update-my-account-password/"}> Şifremi Güncelle </Link>
                                <span className="dropdown-item" onClick={onLogout} style={{ cursor: "pointer" }}> Çıkış </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    } else if (isLoggedIn && role === "EXPORTER") {
        links = (<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            { isLoggedIn &&
                <span id="menu-toggle" onClick={props.toggle} style={{ cursor: "pointer" }}>
                    {/* <MenuIconComponent width={32}  height={32}/> */}
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
                    <li className="nav-item dropdown">
                        <a href="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {username}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/user-detail"> Hesabım </Link>
                            <Link className="dropdown-item" to={"/update-my-account/" + username}> Bilgilerimi Güncelle </Link>
                            <Link className="dropdown-item" to={"/update-my-account-password/"}> Şifremi Güncelle </Link>
                            <span className="dropdown-item" onClick={onLogout} style={{ cursor: "pointer" }}> Çıkış </span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        );
    } else {
        links = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                { isLoggedIn &&
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
                        <li className="nav-item dropdown">
                            <a href="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {username}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/user-detail"> Hesabım </Link>
                                <Link className="dropdown-item" to={"/update-my-account/" + username}> Bilgilerimi Güncelle </Link>
                                <Link className="dropdown-item" to={"/update-my-account-password/"}> Şifremi Güncelle </Link>
                                <span className="dropdown-item" onClick={onLogout} style={{ cursor: "pointer" }}> Çıkış </span>
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