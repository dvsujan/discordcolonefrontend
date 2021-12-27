import React from 'react'
import './serversidebar.css'
import {useHistory} from 'react-router-dom'

function Serverdiv(props) {
	const history = useHistory(); 
	const redirectPage = ()=>{
		if(props.id){
			history.push('/app/'+props.id); 
		 } 
	}	
	return (
		<div className='serverDiv' onClick={redirectPage}>
			<img src={props.icon}/>
		</div>
	)
}

export default Serverdiv
