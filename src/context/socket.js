import React from 'react';
import socketio from "socket.io-client";
const token = localStorage.getItem('token');
export const socket = socketio.connect('http://localhost:5000/',{query:{token}});
export const SocketContext = React.createContext();