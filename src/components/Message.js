import React from 'react'
import './message.css'

function Message(props) {
    return (
       <div class="message">
            <div className='pic'>
                <img src={props.dp} />
            </div>
            <div className='others'>
                <p class="meta">{props.username}<span className='time'>{props.time}</span></p>
                <p class="text">
                    {props.text} 
                </p> 
            </div> 
            
        </div>        
    )
}

export default Message
        
        
        
        
        
        
        
        
        
        
        