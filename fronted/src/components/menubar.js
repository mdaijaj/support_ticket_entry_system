import Errorpage from './error';
import {Route, Routes} from 'react-router-dom';
import HomePage from './home'
import SupportTicket from './support_ticket';
import CreateAgent from './agent_create'
import UpdateAgentDetails from './agent_update';
import Login from './login';
import SupportTicketCreate from './support_ticket_create'
import AgentList from './agentslist'
import UpdateTicket from './support_ticket_update'

const Routing=()=>{

  return(
    <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />  
          <Route path="/agents_list" element={<SupportTicket/>} />  
          <Route path="/error" element={<Errorpage/>} />
          <Route path="/tickets_list" element={<AgentList/>} />
          <Route path="/signup" element={<CreateAgent/>} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/ticket_create" element={<SupportTicketCreate/>} />
          <Route path="/update_ticket/:id" element={<UpdateTicket/>} />
          <Route path="/agent_details_update/:id" element={<UpdateAgentDetails/>} />
        </Routes>
    </>
    )
}


export default Routing;