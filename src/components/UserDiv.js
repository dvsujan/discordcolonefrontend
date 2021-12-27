import React,{useState, useEffect} from 'react'
import './userbar.css'

function UserDiv(props) {
    const [online,setOnline] = useState(false);  
    useEffect(()=>{ 
        if(props.online === true){ 
            setOnline(true); 
        }
        else{ 
            setOnline(false);
        }
    },[]) 
    return (
		<div className='userdiv' style={{backgroundColor:'#2F3136'}}>
			<div className='usimage'>
			<img src={props.image}/>
			</div>		
            <div className='usinfo'>
                <h4 style={{color:online?'green':'grey'}}>{props.name}</h4>
                <p style = {{fontWeight:'200',fontSize:'12px'}}>{online?"online":"offline"}</p> 
            </div>
		</div>
	)
}

export default UserDiv
