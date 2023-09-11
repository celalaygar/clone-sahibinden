import React, { Component, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserLoginPage from './pages/user/UserLoginPage';
import { connect, useDispatch, useSelector } from 'react-redux';
import SideBarMenu from './components/sidebar/Sidebar';
import TopMenu from './components/topmenu/TopMenu';
import * as PATH from './constant/linkConstant';
import { RouteBaseList } from './constant/routeLinksConstant';
import ApiService from './services/base/ApiService';
import AlertifyService from './services/AlertifyService';
import Axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { logoutAsync, selectedAuthentication } from './redux/redux-toolkit/authentication/AuthenticationSlice';


const App = () => {
  const selectedAuth = useSelector(selectedAuthentication);
  const [toggled, setToggled] = useState(false);
  const [controlToggle, setControlToggle] = useState("d-flex ");
  const dispatch = useDispatch();


  Axios.interceptors.response.use(response => {
    return response;
  }, error => {

    if (selectedAuth.isLoggedIn && error.response.status === 401) {
      // ApiService.defaultLogout(selectedAuth.username);
      // ApiService.logout();

      ApiService.changeAuthToken(null);
      dispatch(logoutAsync(null))
      AlertifyService.alert("Lütfen Tekrar Giriş yapınız");
    }

    //console.log(error)
    throw error;
  });


  const toggle = () => {
    setToggled(!toggled);

    if (!toggled === true) {
      setControlToggle("d-flex  toggled");
    } else {
      setControlToggle("d-flex");
    }
  }

  let routeList = (
    <>
      <Route path={PATH.PATH_LOGIN} element={selectedAuth.isLoggedIn ? <HomePage /> : <UserLoginPage />} />
      {
        RouteBaseList.map((route, index) =>

          <Route path={route.path} element={
            route.protectedRoute === true ?
              <ProtectedRoute roles={[...route.roles]}>
                {route.element}
              </ProtectedRoute>
              :
              route.element
          } />
        )
      }
    </>
  )
  let view = null;
  if (!selectedAuth.isLoggedIn) {
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
  if (selectedAuth.isLoggedIn) {
    view = (
      <div className={controlToggle && controlToggle} id="wrapper">
        <BrowserRouter>
          <SideBarMenu />
          <div id="page-content-wrapper">
            <TopMenu toggle={toggle} />
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
    <>
      <>
        {view}
      </>

    </>
  )

};


export default App;