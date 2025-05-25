import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { loadNotifications, markNotificationAsRead, markAllNotificationAsRead } from '../../../redux/notificationSlice.js';
import Avatar from '@mui/material/Avatar';
import {deepOrange} from '@mui/material/colors';
import {NotificationAddRounded} from '@mui/icons-material';

function Notification() {
    const [open, setOpen] = useState(false);
    const {notification} = useSelector(store => store.notification);

    const dispatch = useDispatch();
    
    const unreadNotifications = notification.filter( n => n.isRead === false);
    //console.log("unreadNotifications", unreadNotifications);

    const handleMarkAllAsRead = () => {
        dispatch(markAllNotificationAsRead());
    };

    const handleMarkAsRead = (notificationId) => {
        dispatch(markNotificationAsRead([notificationId]));
    };

    const getNotificationContent = (notification) => {
        const name = notification.senderId.name;
        const username = notification.senderId.username ? `@${notification.senderId.username}` : '';

        const message = (() => {
            switch(notification.type) {
                case 'like': return 'liked your post';
                case 'comment': return 'commented on your post';
                case 'message': return notification.content;
                case 'group': return notification.content;
                default: return notification.content || '';
            }
        });

        return (
            <div className="flex items-start gap-1">
                <div><Avatar alt={notification.senderId.name ? notification.senderId.name : notification.senderId.username} src="/broken-image.jpg" sx={{width:40, height:40, bgcolor:deepOrange[400]}}/></div>
                <div className="flex flex-col">
                    <div style={{fontSize: '0.7rem', color: '#222', padding:'4px', fontWeight:'bolder'}}>
                        <div>{name}</div>
                        <span>{username}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div style={{fontSize: '0.6rem', color: '#444', fontFamily:'cursive', paddingLeft:'10px'}}>
                        {message()}
                    </div>
                    <div style={{fontSize: '0.6rem', color: '#666', fontFamily:'cursive', paddingLeft:'10px'}}>
                        {new Date(notification.createdAt).toLocaleString()}
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        dispatch(loadNotifications());
    }, [dispatch]);

  return (
    <>
        <div style={{position:'relative'}}>
            <div onClick={()=> setOpen(!open)} style={{position:'relative'}}>
                <div>
                    <NotificationAddRounded/>
                </div>
                {
                    unreadNotifications?.length === 0 ? null :
                    <span style={{position:'absolute', top:'-10%', left:'100%', backgroundColor:'red', color:'white', borderRadius: '50%', minWidth: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', padding: '2px'}}>
                        {unreadNotifications?.length}
                    </span>
                }
            </div>
            {open && (
                <div style={{position:'absolute',top:'100%',right: -280,backgroundColor: 'white',border: '1px solid #ddd',borderRadius: '10px',padding: '10px',width: '350px',zIndex: 10}}>
                    <div style={{display:'flex', justifyContent: 'space-between', color:'black', fontFamily:'cursive'}}>
                        <div></div>
                        <button onClick={handleMarkAllAsRead} disabled={unreadNotifications.length === 0}>
                            Mark all as read
                        </button>
                    </div>
                    <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                        {notification.map((n) => (
                            <div key={n._id} onClick={() => handleMarkAsRead(n._id)} style={{padding: '8px',borderBottom: '1px solid #eee',backgroundColor: n.isRead ? '#fff' : '#f5f5f5',cursor: 'pointer',color:'black',fontFamily:'sans-serif',fontSize:'0.8rem',margin:'5px'}}>
                                {/* <div>{n.content}</div> */}
                                {getNotificationContent(n)}
                                {/* <div style={{fontSize: '0.6rem', color: '#666', fontFamily:'cursive'}}>
                                    {new Date(n.createdAt).toLocaleString()}
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default Notification;