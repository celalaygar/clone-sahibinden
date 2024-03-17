import React, { Component, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import PaginationComponent from "../../components/PaginationComponent";
import Preloader from "../../components/preloader/Preloader";
import UserListTable from "./UserListTable";
import ApiService from "../../services/base/ApiService";
import UserService from "../../services/UserService";
import { selectedAuthentication } from "../../redux/redux-toolkit/authentication/AuthenticationSlice";
import { BACK, FIRST, LAST, NEXT } from "../../constant/GeneralConstant";


const UserListPage = () => {

  const selectedAuth = useSelector(selectedAuthentication);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState();
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState({
    content: [],
    number: 0,
    size: 10,
  });

  const resetPage = () => {
    const nextPage = 0;
    getUsersWithPagination(nextPage, page.size);
  }
  const onClickPagination = (event, value) => {
    event.preventDefault();
    if (value === NEXT) {
      const nextPage = page.number + 1;
      getUsersWithPagination(nextPage, page.size);
    } else if (value === BACK) {
      const nextPage = page.number - 1;
      getUsersWithPagination(nextPage, page.size);
    } else if (value === LAST) {
      const nextPage = page.totalPages - 1;
      getUsersWithPagination(nextPage, page.size);
    } else if (value === FIRST) {
      const nextPage = 0;
      getUsersWithPagination(nextPage, page.size);
    }
  };

  const getUsersWithPagination = async (number, size) => {
    setIsLoading(true);
    try {
      const response = await UserService.getUsersWithPagination(number, size);
      setPage({ ...response.data });
    } catch (error) {
      if (error.response) {
        console.log(error.response)
      }
      else if (error.request)
        console.log(error.request);
      else
        console.log(error.message);
    }

    setIsLoading(false);
  };

  const loadRoles = async () => {
    try {
      const roles = await ApiService.get("/roles");
      setRoles(roles.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        if (error.response.status === 401 && error.response.data) {
          console.log(error.response.data);
          setError(error.response.data);
        }
        console.log(error.response);
        if (error.response.data.status === 500) {
          console.log(error.response.data.status);
        }
      } else if (error.request) console.log(error.request);
      else console.log(error.message);
    }
  };


  useEffect(() => {
    getUsersWithPagination(page.number, page.size);
    loadRoles();
  }, []);
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Tüm Kullanıcılar</h5>
          </div>
          {isLoading ? (
            <Preloader width={50} height={50} />
          ) : (
            <div className="row">
              <>
                <div className="col-lg-12">
                  <UserListTable
                    resetPage={resetPage}
                    users={page}
                    roles={roles} />
                </div>
                {page.content.length > 0 ? (
                  <div className="col-sm-12 mt-3 ">
                    <PaginationComponent
                      first={page.first}
                      last={page.last}
                      number={page.number}
                      onClickPagination={onClickPagination}
                      totalPages={page.totalPages}
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
};

export default UserListPage;
