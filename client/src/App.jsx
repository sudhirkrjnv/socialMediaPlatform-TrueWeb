import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout';
import './App.css';
import Home from './Components/Layout/Home/Home';
import Profile from './Components/Layout/Profile/Profile';
import ChatPage from './Components/Layout/ChatPage/ChatPage';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import { useEffect} from 'react';
import { io } from 'socket.io-client';
import {useSelector, useDispatch} from 'react-redux';
import { setSocket, setUserStatus } from './redux/socketSlice';
import { addMessage, setReceivedMessage, updateRecentIndividualChatList, updateRecentGroupChatList } from './redux/ChatSlice';

const browserRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/",
          element:<Profile/>
        },
        {
          path:"/ChatPage/",
          element:<ChatPage/>
        }
      ]
    },
    {
      path:'/signin',
      element:<Signin/>
    },
    {
      path:'/signup',
      element:<Signup/>
    }
  ])
  
  function App() {
    
    const { user } = useSelector((store) => store.auth);
    const { socket } = useSelector((store) => store.socket);
    const dispatch = useDispatch();
  
  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
            withCredentials: true,
            query: { userId: user?._id },
            transports: ['websocket'],
          });
          dispatch(setSocket(socketio));
          
          socketio.on('connect', () => {
            console.log('Connected to socket server');
          });

          socketio.on('userStatus', (data) => {
            dispatch(setUserStatus(data));
          });
          
          socketio.on('messageSent', (message) => {
            dispatch(setReceivedMessage(message));
          });
          
          socketio.on('receiveMessage', (message) => {
            dispatch(addMessage(message));
          });
      
          socketio.on('receive_Group_Message', (message) => {
            dispatch(addMessage(message));
            dispatch(updateRecentGroupChatList(message));
          });
       
          socketio.on('updateIndividualList', (message) => {
              dispatch(updateRecentIndividualChatList({
                  message: message,
                  currentUserId: user._id,
              }));
          });

        return () => {
            socketio.disconnect();
            dispatch(setSocket(null));
        };
    } else if(socket) {
        socket.disconnect();
        dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  );

}

export default App;