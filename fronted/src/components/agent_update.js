import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const UpdateAgentDetails = () => {
    const [userdata, setUserdata] = useState("");
    const navigate = useNavigate()
    const { id } = useParams()
    let name, value;


    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setUserdata({ ...userdata, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            name,
            email,
            mobile,
            city,
            agent_name
              } = userdata;

        let baseurl=`/api/editUserDetails/:${id}`
        const regInf = {
            method: "Put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                mobile,
                city,
                agent_name
            })
        }
        const res = await fetch(baseurl, regInf);
        const result = await res.json()
        console.log("result", result)
        if (res.status === 400 || !res) {
            toast.info('Invalid user details', {autoClose:1500})
        }
        else {
            toast.success('User details updated successfully', {autoClose:1500})
            navigate('/agents_list')
        }
    }


    const getUserDetails=  async(id)=>{
        let baseurl=`/api/getUserDetails/${id}`
        const res = await fetch(baseurl);
        const result = await res.json()
        console.log("result", result)
        let userdata= result.data
        setUserdata(userdata)
    }

    useEffect(()=>{
        getUserDetails(id)
    }, [])
    
    let data= {marginRight: "25px"}

    return (
        <>
        <div className="">
            <NavLink to={`/agents_list`} className="btn btn-primary" style={{margin: "10px"}}>User List</NavLink>
        </div>

        <div className="container" style={{marginTop: "10px"}}>
            <div className="mb-4 row">
                <div className="col-5 sm-4">
                    <input type="text" 
                        className="form-control" 
                        id="inputName" 
                        onChange={handleInput}
                        name='name'
                        value={userdata.name}
                        placeholder="name" />
                </div>
                <div className="col-5 sm-4">
                    <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="agent_name" aria-label="select example" value={userdata}>
                        <option selected>Agent Name*</option>
                        <option value="1">Rahul</option>
                        <option value="2">Elon</option>
                        <option value="3">Priya</option>
                        <option value="4">Sonam Kuawat</option>
                    </select>
                </div>  
            </div>

            <div className="mb-4 row">
                <div className="col-5 sm-4">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleInput}
                        name='email'
                        id="email"
                        value={userdata.email}
                        placeholder="Enter email..."
                    />
                </div>
                <div className="col-5 sm-4">
                    <input type="number" 
                        className="form-control" 
                        id="mobile" 
                        onChange={handleInput}
                        value={userdata.mobile}
                        name='mobile'
                        placeholder="Mobile*"/>
                </div>
                </div>
            <div className="mb-4 row">

                <div className="col-5 sm-4">
                    <input type="text" 
                        className="form-control" 
                        name="city" 
                        onChange={handleInput} 
                        value={userdata.city}
                        id="city" 
                        placeholder="city"/>
                </div>
            </div>

            <div className="mb-2 row">
                <div className="col-20" >
                    <button className="btn btn-info" style={{margin: "50px"}} onClick={handleSubmit}>Submit</button>
                    <button className="btn btn-danger">Cancel</button>
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    )
}

export default UpdateAgentDetails;


