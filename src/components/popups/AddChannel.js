import React,{useState,useEffect,useRef} from 'react'
import adduser from '../../assets/addusertm.svg'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import clipboard from '../../assets/clipboard.svg'
import axios from 'axios'; 

const style = { 
    backgroundColor:'#2F3136',
    margin:0,
    display:'flex',
    flexDirection:'column',
    padding:'10px', 
    padding:0,
    minWidth:'100%', 
    minHeight:'160px',
}

const stylet = { 
    color:'white',
    padding:'5px',  
    margin:0, 
    border:0,
    fontSize:'15px',
    color:'#D6D7D9'
}
const stylet2 = { 
    color:'white',
    padding:'5px',  
    margin:0, 
    border:0,
    fontSize:'15px',
    color:'red',
}

const stylei = {
    padding:'10px', 
    marginTop:'20px',	
    marginBottom:'20px',	
    margin:10,
    border:'none',
    borderRadius:'2px', 
    backgroundColor:'#40444B',
    color:'white',
}

const stylesvg = { 
	padding:'5%',
	margin:'5px',
	borderRadius:'5px',
	color:'white', 
	backgroundColor:'#5865F2',
	border:'0',
}
const URL = 'http://localhost:5000/'
function AddUsers() {
    const [err,setErr] = useState({bool:false , value:"you don't have permission"})
    const nameRef = useRef();  
    const addChannel = ()=>{
        axios.post(URL+'api/v1/guild/textchannel/'+window.location.href.split('/')[4],{name:nameRef.current.value},{headers:{'authorization':'bearer '+localStorage.getItem('token')}}).then((response)=>{ 
            if(response.data.message == 'done'){ 
                window.location.reload();  
            }
            else if(response.data.message == 'perms error'||response.data.message == 'admin error'){ 
                setErr({bool:true,value:"you are not admin"})
            }
            else{ 
                setErr({bool:true,value:"some error occured"})
            }
        })
    } 
    const serverId = window.location.href.split('/')[4];   
    return (
        <div style={style}>
            <p style={stylet}>Enter Channel Name</p>
            {err.bool?(<p style={stylet2}>{err.value}</p>):null}
            <input style={stylei} ref={nameRef} /> 
	   <button style={stylesvg} onClick={addChannel}>add channel</button>
	</div>
	)
}

export default AddUsers
