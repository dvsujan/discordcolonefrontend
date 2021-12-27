import React ,{useRef, useState} from 'react'
import './addserver.css'
import axios from 'axios'; 

const URL = 'http://localhost:5000'; 

function AddServer() {
    const token = localStorage.getItem('token'); 
    const serverIdRef = useRef();  
    const [err,setErr] = useState({bool:false, value:''}) ; 
    const JoinServer = ()=>{
        if(serverIdRef.current.value){
            setErr({bool:false,value:''});  
            axios.post(URL+'/api/v1/guild/join/server/',{serverId:serverIdRef.current.value},
             {headers: {
                'Authorization': `Bearer ${token}` 
            }}).then(res=>{
                if(res.data.message =='done'){  
                    window.location.reload();
                }
                else{ 
                    setErr({bool:true, value:res.data.message});  
                }
            })
        } 
        else{ 
            setErr({bool:true, value:'you should enter Id'}); 
        }
    }
    return (
        <div className='addserverdiv'>
            <p >enter the id of the server</p> 
            {err.bool?(<p className='errorr'>{err.value}</p>):null} 
            <input ref={serverIdRef}/>
            <button onClick={JoinServer}> Join Server</button> 
        </div>
    )
}

export default AddServer
