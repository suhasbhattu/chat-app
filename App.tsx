import React, { useEffect } from 'react';
import axios from 'axios';
import { loadData, loadMessages, selectUsers } from './components/chatAppSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import ChatBox, { PostMessageProps } from './components/ChatBox/ChatBox';
import './App.css';

function App() {

  const
    dispatch = useAppDispatch(),
    users = useAppSelector(selectUsers) || [],

    getUsers = async () => {
      const usersResp = await axios.get('/users');
      return usersResp;
    },

    getMessages = async () => {
      const messageResp = await axios.get('/messages');
      return messageResp;
    },

    handlePost = (request: PostMessageProps) => {
      axios.post('/messages', request).then((response) => {
        getMessages().then((resp) => {
          dispatch(loadMessages(resp.data));
        });
      }).catch((error) => { console.log(error) });
    },
    
    handleDelete = (id: string) => {
      axios.delete(`/messages/${id}`)
      .catch((error) => console.log(error));
    };

  useEffect(() => {
    // load users
    getUsers().then((response) => {
      dispatch(loadData(response.data));
    });

    // load messages
    getMessages().then((response) => {
      dispatch(loadMessages(response.data));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="App-header-text">Chat App</h3>
      </header>
      <div className="App-content">
        <ChatBox sender={users[0]} receiver={users[1]} onPost={handlePost} onDelete={handleDelete} />
        <ChatBox sender={users[1]} receiver={users[0]} onPost={handlePost} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
