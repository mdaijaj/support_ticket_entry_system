import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loader";

const SupportTicketDetails = () => {
  const [achievementList, setAchievementList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl="https://support-ticket-entry-system-two.vercel.app";

  //pagination functionality
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 3;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = achievementList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(achievementList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  

  const [results, setResults] = useState(records);
  const navigate = useNavigate();

  const UserList = async () => {
    const response = await axios.get(`${baseUrl}/api/getagentList`);
    let filterData = await response.data.data;
    setAchievementList(filterData);

  };

  const deleteTicket = async (id) => {
    await fetch(`${baseUrl}/api/deleteTicket/${id}`);
    toast.warning("delete successfully", { autoClose: 2000 });
    UserList();
  };

  const updateAchievementDetails = async (itemId) => {
    navigate(`/editTicketDetails/:${itemId}`);
  };


  //pagination
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    UserList();
  }, []);

  return (
    <>
      <div>{isLoading ? <Loader /> : <h2>Support Ticket List</h2>}</div>
      <div className="main_div" style={{ padding: "50px" }}>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {results.length > 0
              ? results.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td>{item.active}</td>
                      <td>
                        <Link
                          className="btn btn-outline-primary mr-2"
                          style={{ margin: "5px" }}
                          onClick={() => updateAchievementDetails(item._id)}
                          to={`/agent_details_update/${item._id}`}
                        >
                          <i class="fas fa-user-edit"></i>
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </Link>
                        <Link
                          className="btn btn-danger mr-2"
                          style={{ margin: "5px" }}
                          onClick={() => deleteTicket(item._id)}
                        >
                          <i class="fas fa-trash"></i>
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </Link>
                        <Link
                          className="btn btn-primary mr-2"
                          style={{ margin: "5px" }}
                          onClick={() => "handleOpen(item._id)"}
                        >
                          <i class="bi bi-eye-fill"></i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                }) : 
                records?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td>{item.active}</td>

                      <td>
                        <Link
                          className="btn btn-outline-primary mr-2"
                          style={{ margin: "5px" }}
                          onClick={() => updateAchievementDetails(item._id)}
                          to={`/agent_details_update/${item._id}`}
                        >
                          Edit<i class="fas fa-user-edit"></i>
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </Link>
                        <Link
                          className="btn btn-danger mr-2"
                          style={{ margin: "5px" }}
                          onClick={() => deleteTicket(item._id)}
                        >
                          Delete<i class="fas fa-trash"></i>
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </Link>
                        <Link
                          className="btn btn-primary mr-2"
                          style={{ margin: "5px" }}
                          onClick={() => "handleOpen(item._id)"} >
                          <i class="bi bi-eye-fill"></i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye-fill"
                            viewBox="0 0 16 16" >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

        <ToastContainer />
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={previousPage}> Prev{" "}</a>
            </li>
            {numbers.map((n, i) => (
                <li className={`page-item${currentPage == n ? "active" : ""}`} key={i}><a
                  href="#"
                  className="page-item"
                  onClick={() => changeCurPage(n)}
                />
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                {" "}
                Next{" "}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SupportTicketDetails;
