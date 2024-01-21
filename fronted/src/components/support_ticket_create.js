import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./document.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const SupportTicketCreate = () => {
  const [userdata, setUserdata] = useState();
  const [agent, setAgent] = useState([]);

  const navigate = useNavigate();

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserdata({ ...userdata, [name]: value }); //[] dynamic data for
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { topic, assignedTo, severity_level,ticket_type,status,description } = userdata;

    const regInf = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic, assignedTo, severity_level,ticket_type,status,description
      }),
    };
    const res = await fetch("https://support-ticket-entry-system-two.vercel.app/api/createSupportTicket", regInf);
    const result = await res.json();
    console.log("result", result);
    if (result.status === 400 || !result) {
      toast.info("Invalid user details", { autoClose: 1500 });
    } else {
      toast.success("new candidate add is successfully", { autoClose: 1500 });
      navigate('/tickets_list')
    }
  };

  const agentList= async()=>{
    const response = await axios.get('/api/getagentList');
    let filterData = await response.data.data
    setAgent(filterData)
  }


  useEffect(()=>{
    agentList()
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        className="main"
        style={{ backgroundColor: "#022238", width: "100%", height: "200px" }}
      >
        <div>
          <img
            src="https://www.corefactors.in/blog/content/images/size/w2000/wordpress/2021/09/What-Is-Ticket-Id-in-Support-Software-and-How-Helpful-It-Is-.jpg" alt="not found url"
            width="420"
            height="200"
          ></img>
        </div>
      </div>
      <h1>Support Ticket Create</h1>

      <div className="container" style={{ marginTop: "10px" }}>
        <div className="mb-6 row">
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Topic
            </label>
            <input
              type="text"
              className="form-control"
              id="topic"
              onChange={handleInput}
              name="topic"
              placeholder="topic"
            />
          </div>
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Assign To
            </label>
            <select
              className="form-select"
              id="assignedTo"
              onChange={handleInput}
              name="assignedTo"
              aria-label="select example"
            >
              <option selected>Select Agent</option>
            {agent?.map((menu, index) => (
                <option value={`${menu.first_name} ${menu.last_name}`}>{`${menu.first_name} ${menu.last_name}`}</option>
            ))}
            </select>
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Severity Level
            </label>
            <select
              className="form-select"
              id="severity_level"
              onChange={handleInput}
              name="severity_level"
              aria-label="select example"
            >
              <option selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Ticket Type{" "}
            </label>
            <select
              className="form-select"
              id="ticket_type"
              onChange={handleInput}
              name="ticket_type"
              aria-label="select example"
            >
              <option selected>Easy</option>
              <option value="Average">Average</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Very_Hard">Very Hard</option>
            </select>
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-12 md-4">
            <label for="formGroupExampleInput" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              onChange={handleInput}
              name="description"
              id="description"
              placeholder="Enter description..."
            />
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-mdm-4">
            <button
              className="btn btn-info"
              onClick={handleSubmit}
              style={{
                margin: "auto",
                width: "100px",
                borderRadius: "15px",
                height: "50px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SupportTicketCreate;
