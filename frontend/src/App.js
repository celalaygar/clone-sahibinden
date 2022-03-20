
import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserLoginPage from './pages/user/UserLoginPage';
import UserSignUpPage from './pages/user/UserSignUpPage';
import { connect } from 'react-redux';
import SideBarMenu from './components/sidebar/Sidebar';
import TopMenu from './components/topmenu/TopMenu';
import MyAccountEditPage from './pages/user/myAccount/MyAccountEditPage';
import UserListPage from './pages/user/UserListPage';
import NyAccountPage from './pages/user/myAccount/MyAccountPage';
import UserPage from './pages/user/UserPage';
import UserUpdatePage from './pages/user/UserUpdatePage';
import CompanySearchPage from './pages/company/CompanySearchPage';
import MyAccountPasswordEdiPage from './pages/user/myAccount/MyAccountPasswordEdiPage';
import * as PATH from './constant/linkConstant';
import * as ROLE from './constant/roleConstant';
import ApiService from './services/base/ApiService';
import { logoutAction } from './redux/AuthenticationAction';
import AlertifyService from './services/AlertifyService';
import Axios from 'axios';
import InfoPage from './pages/information/InfoPage';
import UserPersonelSearchPage from './pages/user/personel/UserPersonelSearchPage';
import ContactPage from './pages/information/ContactPage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      controlToggle: "d-flex",
    };
  }

  componentDidMount() {

    Axios.interceptors.request.use(request => {
      //this.setState({ pendingApiCall: true })
      //console.log("request : "+request)
      return request;
    }, error => {
      //this.setState({ pendingApiCall: false })
      //console.log("request error : "+error)
      throw error;
    });

    Axios.interceptors.response.use(response => {
      return response;
    }, error => {

      if (this.props.isLoggedIn === true && String(error).includes("401")) {
        ApiService.defaultLogout(this.props.username);
        ApiService.logout();

        ApiService.changeAuthToken(null);
        this.props.dispatch(logoutAction());
        AlertifyService.alert("Lütfen Giriş yapınız");
      }
      console.log(error)
      throw error;
    });
  }

  toggle = () => {
    this.setState({ toggled: !this.state.toggled });

  }

  render() {
    const { isLoggedIn, role } = this.props;

    let links = null;
    if (!isLoggedIn) {
      links = (
        <Routes>
          {/* <Route path="/deneme" element={<Deneme />} />
          <Route path="/deneme2" element={<Deneme2 />} /> */}
          <Route exact path="/login" element={<UserLoginPage />} />
          <Route exact path="/" element={<UserLoginPage/>} />
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
      );
    }
    if (isLoggedIn && role === ROLE.ROLE_ADMIN) {
      links = (
        <Routes>
          <Route exact path={PATH.PATH_INDEX} element={<HomePage />} />
          <Route path="/info-page" element={<InfoPage />} />
          <Route path="/contact-page" element={<ContactPage/>}/>

          <Route path={PATH.PATH_GET_ALL_USERS} element={<UserListPage/>}   />
          <Route path={PATH.PATH_SAVE_USER} element={<UserSignUpPage/>}   />
          <Route path="/user-detail" element={<NyAccountPage/>}   />
          <Route path={PATH.PATH_USER_FIND_BY_ID} element={<UserPage/>}   />
          <Route path={PATH.PATH_EDIT_USER} element={<UserUpdatePage/>}   />
          <Route path={PATH.PATH_UPDATE_MY_ACCOUNT} element={<MyAccountEditPage/>}   />
          <Route path="/update-my-account-password" element={<MyAccountPasswordEdiPage/>}   />

          <Route path={"/search-user"} element={<UserPersonelSearchPage/>}   />
          <Route path="/search-company" element={<CompanySearchPage/>}   />   />
          {/* <AuthenticatedRoute path="/search-company" element={CompanySearchPage}   /> */}
          <Route path="*" element={<Navigate to ="/index" />}/>
        </Routes>
      );
    }


    let controlToggle = "d-flex";
    if (this.state.toggled === true) {
      controlToggle += " toggled";
    }

    let view = null;
    if (!isLoggedIn) {
      view = (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <BrowserRouter>
                {links}
              </BrowserRouter>
            </div>
          </div>
        </div>
      );
    }
    if (isLoggedIn) {
      view = (
        <div className={controlToggle} id="wrapper">
          <BrowserRouter>
            <SideBarMenu />
            <div id="page-content-wrapper">
              <TopMenu toggle={this.toggle} />
              <div className="container-fluid">
                {links}
              </div>
            </div>
          </BrowserRouter>
        </div>
      );

    }
    return (
      view
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    jwttoken: store.jwttoken,
    role: store.role,
    userId: store.userId
  };
};

export default connect(mapStateToProps)(App);
