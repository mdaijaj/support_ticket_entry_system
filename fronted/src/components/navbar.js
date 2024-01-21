import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css"


const Navbar = () => {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img src="https://assets-global.website-files.com/60e7f6b5ecd3ae8e0c125cd7/6131e01adfd606498def3180_Shvasa-logo-wave.png" width="100" height="70" className="d-inline-block align-top" alt="image path not found" />
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/ticket_create">Support Ticket Create</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/tickets_list">Support Ticket List</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/signup">Agent Create </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/agents_list">Agent List</NavLink>
                            </li>
                        </ul>
                        {!localStorage.getItem('user') ?

                            <form className='d-flex'>
                                <Link className='btn btn-dark mx-2' to="/signup" role="button">Agent Register</Link>
                                <Link className='btn btn-dark mx-2' to="/signin" role="button">Agent Login</Link>
                            </form>
                            :
                            <>
                                <button onClick={handleLogout} className='btn btn-dark'>Logout</button>
                                {/* <h4 style={{ padding: "40px" }}>{JSON.parse(localStorage.getItem('user')).first_name}</h4> */}
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4qV8A3FNxEQwtXcSJ4laIf9JsNt0A1dcMMqBCe4J8pbIB0Tn_Kzo5oeUxfD_aQjJHVY&usqp=CAU' style={{width: "80px", height: "80px", borderRadius: "50%"}}></img>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}



export default Navbar;
