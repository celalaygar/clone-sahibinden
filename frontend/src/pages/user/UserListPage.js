import React, { Component } from "react";
import { connect } from "react-redux";
import PaginationComponent from "../../components/PaginationComponent";
import Preloader from "../../components/preloader/Preloader";
import UserListTable from "./UserListTable";
import ApiService from "../../services/base/ApiService";
import UserService from "../../services/UserService";

class UserListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: [],
      page: {
        content: [],
        number: 0,
        size: 10,
      },
      pendingApiCall: false,
    };
  }
  componentDidMount() {
    // this.loadUsers();
    this.getUsersWithPagination(this.state.page.number, this.state.page.size);
    this.loadRoles();
  }
  resetPage = () => {
    const nextPage = 0;
    this.getUsersWithPagination(nextPage, this.state.page.size);
  }
  onClickPagination = (event, value) => {
    event.preventDefault();
    if (value === "next") {
      const nextPage = this.state.page.number + 1;
      this.getUsersWithPagination(nextPage, this.state.page.size);
    } else if (value === "back") {
      const nextPage = this.state.page.number - 1;
      this.getUsersWithPagination(nextPage, this.state.page.size);
    } else if (value === "last") {
      const nextPage = this.state.page.totalPages - 1;
      this.getUsersWithPagination(nextPage, this.state.page.size);
    } else if (value === "first") {
      const nextPage = 0;
      this.getUsersWithPagination(nextPage, this.state.page.size);
    }
  };

  getUsersWithPagination = async (number, size) => {
    this.setState({ pendingApiCall: true });
    try {


      const response = await UserService.getUsersWithPagination(number, size);
      this.setState({ page: response.data });

    } catch (error) {
      if (error.response) {
        console.log(error.response)
      }
      else if (error.request)
        console.log(error.request);
      else
        console.log(error.message);
    }

    this.setState({ pendingApiCall: false })
  };

  loadRoles = async () => {
    try {
      const roles = await ApiService.get("/roles");
      this.setState({ roles: roles.data });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        if (error.response.status === 401 && error.response.data) {
          console.log(error.response.data);
          this.setState({ error: error.response.data });
        }
        console.log(error.response);
        if (error.response.data.status === 500) {
          console.log(error.response.data.status);
          //AlertifyService.alert("Lütfen Tekrar giriş yapınız...");
        }
      } else if (error.request) console.log(error.request);
      else console.log(error.message);
    }
  };

  render() {
    const { roles } = this.state;

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Tüm Kullanıcılar</h5>
            </div>
            {this.state.pendingApiCall ? (
              <Preloader width={50} height={50} />
            ) : (
              <div className="row">
                <>
                  <div className="col-lg-12">
                    <UserListTable
                      resetPage={this.resetPage}
                      users={this.state.page}
                      roles={roles} />
                  </div>
                  {this.state.page.content.length > 0 ? (
                    <div className="col-sm-12 mt-3 ">
                      <PaginationComponent
                        first={this.state.page.first}
                        last={this.state.page.last}
                        number={this.state.page.number}
                        onClickPagination={this.onClickPagination}
                        totalPages={this.state.page.totalPages}
                      />
                    </div>
                  ) : null}
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    jwttoken: store.jwttoken,
    role: store.role,
  };
};

export default connect(mapStateToProps)(UserListPage);
