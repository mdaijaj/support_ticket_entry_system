import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./document.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const SupportTicketUpdate = () => {
  const [userdata, setUserdata] = useState();
  const [ticketdata, setTicketdata] = useState();
  const [agent, setAgent] = useState([]);

  const navigate = useNavigate();
  let { id } = useParams()

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
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic, assignedTo, severity_level,ticket_type,status,description
      }),
    };
    const result = await axios.put(`/api/editTicketDetails/${id}`, regInf);
    if (result.data.result.status === 400 || !result.data.result.status) {
      toast.info("Invalid user details", { autoClose: 1500 });
    } else {
      toast.success("Assignid is successfully", { autoClose: 1500 });
      navigate('/tickets_list')
    }
  };

  const agentList= async()=>{
    const response = await axios.get('/api/getagentList');
    let filterData = await response.data.data
    setAgent(filterData)
  }

  const supportTicketDetails= async(id)=>{
    const response = await axios.get(`/api/supportTicketDetails/${id}`);
    let filterData = await response.data.data
    setTicketdata(filterData)
  }


  useEffect(()=>{
    supportTicketDetails(id)
    agentList()
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        className="main"
        style={{ backgroundColor: "#022238", width: "100%", height: "150px" }}
      >
        <div style={{ marginTop: "35px" }}>
          <img
            src="https://5d.solutions/wp-content/themes/5d/images/logo.svg" alt="not found url"
            width="100"
            height="70"
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
              value={ticketdata?.topic}
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
              <option selected>{ticketdata?.severity_level}</option>
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
              <option selected>{ticketdata?.ticket_type}</option>
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
              value={ticketdata?.description}
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

export default SupportTicketUpdate;
