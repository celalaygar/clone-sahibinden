const { useSelector } = require("react-redux");


const NavbarComponent = props =>{
    const {isLoggedIn, username, role} = useSelector( store =>{
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            role: store.role
        };
    });


    return (
        <div className="col-lg-12">
        </div>
    )
}