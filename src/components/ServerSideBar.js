import React,{useState, useEffect} from 'react'; 
import Serverdiv from './Serverdiv'; 
import axios from 'axios'; 
import plusIcon from '../assets/plus.svg' 
import Popup from 'reactjs-popup';
import Add from '../assets/add.svg'
import AddServer from './popups/AddServer'
import 'reactjs-popup/dist/index.css';
import './serversidebar.css'
import CreateServer from './popups/CreateServer'
const URL ='http://localhost:5000'

function ServerSideBar() {
	const [servers,setServers] = useState([]); 
	const getUserServers = ()=>{ 
		axios.get(URL+'/api/v1/channels/servers',
		{ headers:{'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		).then(response=>{
			setServers(response.data)
		}); 
	}	
	useEffect(()=>{ 
		getUserServers(); 
	},[])	
	return (
		<div className='serversidebar'>
		{servers.map((i,index)=> (
                	<Serverdiv id={i.server.id} name={i.server.name} icon={URL+'/'+i.server.icon}/>
		))}

		<Popup trigger={<div className='addserver'>
		<img src={plusIcon}/>
		</div>} position="right top">
			<AddServer/>
		</Popup>
		<Popup trigger={<div className='addserver'>
		<img src={Add}/>
		</div>} position="right middle">
    				<CreateServer/>
		</Popup>
		
		</div>
	)
}

export default ServerSideBar
