import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as ROLE from "./constant/roleConstant";
import { PATH_DEFAULT } from "./constant/linkConstant";
import AlertifyService from "./services/AlertifyService";

const ProtectedRoute = ({ roles, children, redirectTo, isLoggedIn, role }) => {
    
    let some = Array.from(roles).some(r => r === role || role === ROLE.ROLE_ALL)
    if (some) return children;

    AlertifyService.alert("Giriş Yetkiniz Yoktur.");
    return <Navigate to={redirectTo || PATH_DEFAULT} />;
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