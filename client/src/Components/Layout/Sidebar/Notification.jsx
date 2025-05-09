import { useState } from 'react';
import {NotificationAddRounded} from '@mui/icons-material';
import {useSelector} from 'react-redux';

function Notification() {
    const [open, setOpen] = useState(false);
    const {notification} = useSelector(store => store.chat);

    const getUnreadNotification = (notification)=>{
        return notification.filter((n)=>n.isRead === false)
    }
    const unreadNotifications = getUnreadNotification(notification);
    //console.log("unreadNotifications", unreadNotifications);

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
            <div style={{display:'flex', position:'absolute',top:'100%', left:'50%', whiteSpace: 'nowrap',transform: 'translateX(-20%)', color:'red', zIndex:'10'}}>
                {
                    open && (
                        <div style={{display:'flex', gap:'10px'}}>
                            <div>Notifications</div>
                            <div>Mark as Read</div>
                        </div>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default Notification;