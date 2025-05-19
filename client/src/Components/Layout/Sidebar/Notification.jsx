import { useState, useEffect } from 'react';
import {NotificationAddRounded} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import { loadNotifications, markNotificationAsRead, markAllNotificationAsRead } from '../../../redux/chatSlice.js';

function Notification() {
    const [open, setOpen] = useState(false);
    const {notification} = useSelector(store => store.chat);

    const dispatch = useDispatch();

    const getUnreadNotification = (notification)=>{
        return notification.filter((n)=>n.isRead === false)
    }
    const unreadNotifications = getUnreadNotification(notification);
    //console.log("unreadNotifications", unreadNotifications);

    const handleMarkAllAsRead = () => {
        dispatch(markAllNotificationAsRead());
    };

    const handleMarkAsRead = (notificationId) => {
        dispatch(markNotificationAsRead([notificationId]));
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
                {/* {
                    notification?.length === 0 ? null :
                    <span style={{color:'red', position:'absolute', top:'-10%', left:'100%', backgroundColor:'red', color:'white', borderRadius: '50%', minWidth: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', padding: '2px'}}>{notification?.length}</span>
                } */}
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
                        {notification.map((notif) => (
                            <div key={notif._id} onClick={() => handleMarkAsRead(notif._id)} style={{padding: '8px',borderBottom: '1px solid #eee',backgroundColor: notif.isRead ? '#fff' : '#f5f5f5',cursor: 'pointer',color:'black',fontFamily:'sans-serif',fontSize:'0.8rem',margin:'5px'}}>
                                <div>{notif.content}</div>
                                <div style={{fontSize: '0.6rem', color: '#666', fontFamily:'cursive'}}>
                                    {new Date(notif.createdAt).toLocaleString()}
                                </div>
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