import React,{useState,useEffect} from 'react'
import adduser from '../../assets/addusertm.svg'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import clipboard from '../../assets/clipboard.svg'
const style = { 
    backgroundColor:'#2F3136',
    margin:0,
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding:'10px', 
    padding:0,
    minWidth:'100%', 
    minHeight:'100%',
}

const stylet = { 
    color:'white',
    padding:'5px',  
    margin:0, 
    border:0,
    fontSize:'11px',
}

const stylei = { 
    margin:10,
    border:'none',
    borderRadius:'2px', 
}

const stylesvg = { 
    width:'10%',
}
function AddUsers() {
    const serverId = window.location.href.split('/')[4];   
    return (
		<div style={style}>
            <img src={adduser}/> 
            <p style={stylet}>An adventure begins.</p> 
            <p style={stylet}>Let's add some friends!</p>
            <p style={stylet}>Share this Id to you're friends!</p>
            <div style={{display: 'flex',justifyContent:'center'}}>
            <input style={stylei} value={serverId} readonly/> 
            <CopyToClipboard text={serverId} >
                <img src={clipboard} style={stylesvg}/> 
            </CopyToClipboard>
        </div> 
        </div>
	)
}

export default AddUsers
