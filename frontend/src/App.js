import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserLoginPage from './pages/user/UserLoginPage';
import { connect } from 'react-redux';
import SideBarMenu from './components/sidebar/Sidebar';
import TopMenu from './components/topmenu/TopMenu';
import UserPage from './pages/user/UserPage';
import CompanySearchPage from './pages/company/CompanySearchPage';
import * as PATH from './constant/linkConstant';
import * as ROLE from './constant/roleConstant';
import { RouteBaseList } from './constant/routeLinksConstant';
import ApiService from './services/base/ApiService';
import { logoutAction } from './redux/AuthenticationAction';
import AlertifyService from './services/AlertifyService';
import Axios from 'axios';
import InfoPage from './pages/information/InfoPage';
import UserPersonelSearchPage from './pages/user/personel/UserPersonelSearchPage';
import MyAccountEditPage from './pages/user/myAccount/MyAccountEditPage';
import NyAccountPage from './pages/user/myAccount/MyAccountPage';
import UserUpdatePage from './pages/user/UserUpdatePage';
import UserSignUpPage from './pages/user/UserSignUpPage';
import MyAccountPasswordEdiPage from './pages/user/myAccount/MyAccountPasswordEdiPage';
import ContactPage from './pages/information/ContactPage';
import ProtectedRoute from './ProtectedRoute';
import UserListPage from './pages/user/UserListPage';

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
    let { isLoggedIn } = this.props;
    let routeList = (
        <>
          <Route path={PATH.PATH_LOGIN} element={ isLoggedIn ? <HomePage/> : <UserLoginPage />} />
          {/* <Route path="*" element={<Navigate to="/"/>} /> */}

          {
            RouteBaseList.map((route, index) =>
              <Route path={route.path} element={
                route.protectedRoute ?
                <ProtectedRoute roles={[...route.roles]}>
                  {route.element}
                </ProtectedRoute>
                : 
                route.element
              } />
            )
          }
          
          {/* <Route path={PATH.PATH_DEFAULT} element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN]}>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path={PATH.PATH_INDEX} element={
            <ProtectedRoute path={PATH.PATH_INDEX} roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/search-company" element={
            <ProtectedRoute roles={[ROLE.ROLE_MANAGER]}>
              <CompanySearchPage />
            </ProtectedRoute>
          } />
          <Route path="/search-user" element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <UserPersonelSearchPage />
            </ProtectedRoute>
          } />
          <Route path="/reporting-page" element={
            <ProtectedRoute roles={[ROLE.ROLE_MANAGER]}>
              <UserPage />
            </ProtectedRoute>
          } />
          <Route path="/contact-page" element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]} >
              <ContactPage />
            </ProtectedRoute>
          } />
          <Route path="/info-page" element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <InfoPage />
            </ProtectedRoute>
          } />
          <Route path={PATH.PATH_GET_ALL_USERS} element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <UserListPage />
            </ProtectedRoute>
          } />
          <Route path={PATH.PATH_SAVE_USER} element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <UserSignUpPage />
            </ProtectedRoute>
          } />
          <Route path="/user-detail" element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <NyAccountPage />
            </ProtectedRoute>
          } />
          v
          <Route path={PATH.PATH_USER_FIND_BY_ID} element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <UserPage />
            </ProtectedRoute>
          } />
          <Route path={PATH.PATH_EDIT_USER} element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <UserUpdatePage />
            </ProtectedRoute>
          } />
          <Route path="/update-my-account-password" element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <MyAccountPasswordEdiPage />
            </ProtectedRoute>
          } />
          v
          <Route path={PATH.PATH_UPDATE_MY_ACCOUNT} element={
            <ProtectedRoute roles={[ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]}>
              <MyAccountEditPage />
            </ProtectedRoute>
          } /> */}
        </>
      )

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
                <Routes>
                  {routeList}
                </Routes>
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
                <Routes>
                  {routeList}
                </Routes>
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
