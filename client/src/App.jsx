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
import { setSocket, setTypingData, setOnlineUsers} from './redux/socketSlice';
import { addMessage, updateMessageStatus, addGroupList, updateRecentIndividualChatList, updateRecentGroupChatList } from './redux/chatSlice';
import { loadNotifications, setNotification, _markAllNotificationsAsRead, _markNotificationAsRead, _markChatListNotificationsAsRead } from './redux/notificationSlice.js';

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
    const {notification} = useSelector(store => store.notification);
    
    const dispatch = useDispatch();

    console.log("Notification", notification);
  
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
          
      dispatch(loadNotifications());

      socketio.on('receiveMessage', (message) => {
        dispatch(addMessage(message));
        dispatch(updateRecentIndividualChatList({
          message: message,
          currentUserId: user._id,
        }));
      });

      socketio.on('addNewGroup', (group) => {
        dispatch(addGroupList(group));
      });
  
      socketio.on('receive_Group_Message', (message) => {
        dispatch(addMessage(message));
        dispatch(updateRecentGroupChatList(message));
      });

      socketio.on('messageStatusUpdate', ({ messageId, status }) => {
            dispatch(updateMessageStatus({ messageId, status }));
      });

      socketio.on('notificationRead', ({ notificationId, recipientId }) => {
          dispatch(_markNotificationAsRead({notificationIds: notificationId}));
      });

      socketio.on('chatNotificationsRead', ({ recipientId, chatId, isGroup }) => {
          dispatch(_markChatListNotificationsAsRead({ 
            groupId: isGroup ? chatId : undefined, 
            senderId: !isGroup ? chatId : undefined
          }));
      });

      socketio.on('allNotificationsRead', () => {
          dispatch(_markAllNotificationsAsRead());
      });

      socketio.on('onlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('typing', (data) => {
        dispatch(setTypingData(data));
        setTimeout(()=>dispatch(setTypingData(null)), 2000);
      });

      socketio.on('getNotification', (data) => {
        dispatch(setNotification(prev => [data, ...prev]));
      });

      socketio.on('refreshNotification', (data) => {
        dispatch(loadNotifications());
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