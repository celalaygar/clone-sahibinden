import { Navigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import * as ROLE from "./constant/roleConstant";
import { PATH_DEFAULT } from "./constant/linkConstant";
import { selectedAuthentication } from "./redux/redux-toolkit/authentication/AuthenticationSlice";

const ProtectedRoute = ({ roles, children, isLoggedIn, role }) => {

    const selectedAuth = useSelector(selectedAuthentication);
    return selectedAuth.isLoggedIn
        ? Array.from(roles).some(r => r === selectedAuth.role || role === ROLE.ROLE_ADMIN)
            ? children
            : <Navigate to={PATH_DEFAULT} replace />
        : <Navigate to="/login" />

}


export default ProtectedRoute;