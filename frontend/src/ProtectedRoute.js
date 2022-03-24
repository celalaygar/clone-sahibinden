import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as ROLE from "./constant/roleConstant";
import { PATH_DEFAULT } from "./constant/linkConstant";
import AlertifyService from "./services/AlertifyService";

const ProtectedRoute = ({ roles, children, isLoggedIn, role }) => {

    return isLoggedIn
        ? Array.from(roles).some(r => r === role || role === ROLE.ROLE_ALL)
            ? children
            : <Navigate to={PATH_DEFAULT} replace />
        : <Navigate to="/login" />

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
export default connect(mapStateToProps)(ProtectedRoute);