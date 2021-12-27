import React,{useEffect, useState} from 'react'
import axios from 'axios'
import UserDiv from '../components/UserDiv'
import InfiniteScroll from "react-infinite-scroll-component";
const URL = 'http://localhost:5000'


function UsersBar(props) {
  const [users,setUsers] = useState([]);
  const [havemore, setHavemore] = useState(true); 
  const [page, setPage] = useState('1');  
  const serverId = window.location.href.split('/')[4];
  
    const getUsers = ()=>{
        const requrl =  URL+'/api/v1/channels/users/'+serverId+`/?limit=20&page=${1}`; 
        if(serverId){ 
              axios.get(requrl,{headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(res=>{
                if(res.data.page >= page){ 
                setHavemore(false);
              }  
              else{ 
                setUsers(res.data.users);
                setPage(Number(page)+1);   
              }
            });
        } 
        else{
          setHavemore(false); 
        } 
    } 
    useEffect(()=>{
     getUsers();
    },[serverId]) 
    
    return (
	    <div>
            <InfiniteScroll
          dataLength={users.length}
          next={getUsers}
          hasMore={havemore}
          loader={<h4 style={{color:'white'}}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>InviteMoreFireends?</b>
            </p>
          }
        >
          {users.map((i, index) => (
            <UserDiv online={i.user.online} name={i.user.username} image={URL+'/'+i.user.dp} status ={i.user.status}></UserDiv>
          ))}
        </InfiniteScroll> 
        </div>
	)
}

export default UsersBar
