import { Navigate } from "react-router-dom";
import CompanySearchPage from "../pages/company/CompanySearchPage";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/information/ContactPage";
import InfoPage from "../pages/information/InfoPage";
import MyAccountEditPage from "../pages/user/myAccount/MyAccountEditPage";
import NyAccountPage from "../pages/user/myAccount/MyAccountPage";
import MyAccountPasswordEdiPage from "../pages/user/myAccount/MyAccountPasswordEdiPage";
import UserPersonelSearchPage from "../pages/user/personel/UserPersonelSearchPage";
import UserListPage from "../pages/user/UserListPage";
import UserPage from "../pages/user/UserPage";
import UserSignUpPage from "../pages/user/UserSignUpPage";
import UserUpdatePage from "../pages/user/UserUpdatePage";
import * as PATH from "./linkConstant";
import * as ROLE from "./roleConstant";

export const RouteBaseList = [
    {
        path: "*",
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <Navigate to="/" />,
        key: PATH.PATH_DEFAULT,
        protectedRoute: false,
    },
    {
        path: PATH.PATH_DEFAULT,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <HomePage />,
        key: "default",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_INDEX,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <HomePage />,
        key: "index",
        protectedRoute: true,
    },
    {
        path: "/search-company",
        roles: [ROLE.ROLE_ADMIN],
        element: <CompanySearchPage />,
        key: "searchCompany",
        protectedRoute: true,
    },
    {
        path: "/search-user",
        roles: [ROLE.ROLE_ADMIN],
        element: <UserPersonelSearchPage />,
        key: "searchUser",
        protectedRoute: true,
    },
    {
        path: "/contact-page",
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <ContactPage />,
        key: "contactPage",
        protectedRoute: true,
    },
    {
        path: "/info-page",
        roles: [ROLE.ROLE_ADMIN],
        element: <InfoPage />,
        key: "infoPage",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_GET_ALL_USERS,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <UserListPage />,
        key: "getAllUsers",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_SAVE_USER,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <UserSignUpPage />,
        key: "saveUsers",
        protectedRoute: true,
    },
    {
        path: "/user-detail",
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <NyAccountPage />,
        key: "userDetail",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_USER_FIND_BY_ID,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <UserPage />,
        key: "userByUserId",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_EDIT_USER,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <UserUpdatePage />,
        key: "editUserByUserId",
        protectedRoute: true,
    },
    {
        path: "/update-my-account-password",
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <MyAccountPasswordEdiPage />,
        key: "updateMyAccountPassword",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_UPDATE_MY_ACCOUNT,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <MyAccountEditPage />,
        key: "updateMyAccountPasswordByUsername",
        protectedRoute: true,
    },
]
