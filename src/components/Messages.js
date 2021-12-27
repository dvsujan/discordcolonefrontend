import React from 'react'
import './messages.css'
import { useState, useEffect, useContext, useRef } from 'react'
import Message from './Message';
import Popup from 'reactjs-popup';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import nomessage from '../assets/nomessage.svg'
import Lottie from "lottie-react";
import *as MessaegShimmer from '../assets/MessageShimmer.json';
import { SocketContext } from '../context/socket';
const URL = 'http://localhost:5000'

function Messages() {
  const serverId = window.location.href.split('/')[4];
  const channelId = window.location.href.split('/')[5];
  const messageRef = useRef();
  const [isEmpty, setEmpty] = useState(false);
  const [id, setId] = useState('');
  const [Messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);  
  const socket = useContext(SocketContext);
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      console.log();
      const msg = messageRef.current.value;
      socket.emit('snd-msg',channelId,msg); 
      // socket.emit('hello', "hello");
    }
  }
  const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const getMessages = () => {
    setLoading(true);
    const URLM = `${URL}/api/v1/channels/${window.location.href.split('/')[5]}/messages/${window.location.href.split('/')[4]}/?limit=50&page=${page}`;
    axios.get(URLM,
      {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      }).then(res => {
        if (res.data.messages.length == 0) {
          setEmpty(true);
          setLoading(false);
        } else {
          setMessages(res.data.messages);
          // console.log(res.data.messages);  
          setEmpty(false);
          setLoading(false);
          console.log(Messages); 
        }
      })
  }
 
  useEffect(() => {
    scrollToBottom(); 
    if (Number(Messages.length) == 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [Messages])
  
  useEffect(() => {
    setMessages([]); 
    getMessages();
  }, [channelId])
  
  useEffect(() => {
    socket.on("rev-msg", msg => {
      if(msg.message.channelId == channelId){ 
        setMessages([...Messages, msg]);
        // console.log(Messages); 
      } 
      else{
        console.log("new message have arrived");
       }
    });
  }, [])

  return (
    <div className='messagesPage'>
      {loading && channelId &! isEmpty ?
        (<div>
          <Lottie style={{ width: '30%', paddingLeft: '5%' }} animationData={MessaegShimmer} />
          <Lottie style={{ width: '30%', paddingLeft: '5%' }} animationData={MessaegShimmer} />
        </div>) : (
          <div className='messagebox'>
            <InfiniteScroll
              dataLength={Messages.length}
              next={getMessages}
              hasMore={false}
              loader={<h4>Loading...</h4>}
            >
              {Messages.map((i, index) => {
                return <Message text={i.message.content} time={i.message.time.split(':')[0]} username={i.message.author.username} dp={URL + '/' + i.message.author.DP} />
              })}
            </InfiniteScroll>
            <div ref={messagesEndRef} />
          </div>
          
        )}
      <div className='chatbox'>
        <div className='chatform'>
          <input onKeyPress={handleKeypress} ref={messageRef} />
        </div>
      </div>
    </div>
  )
}

export default Messages
