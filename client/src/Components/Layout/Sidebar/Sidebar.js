import Avatar from '@mui/material/Avatar';
import {deepOrange} from '@mui/material/colors';
import {OndemandVideo, Home, Group, Settings, Person, NotificationAddRounded, Logout} from '@mui/icons-material';
import { MessageCircleMore } from 'lucide-react';
import shorts from "./shorts.png"
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';

function Sidebar(){

    const [activeSection, setActiveSection] = useState();
    let navigate = useNavigate();

    const {user} = useSelector(store=>store.auth);

    const activeSectionHandler = (section)=>{
        setActiveSection(section);
    }

    const logoutHandler = async()=>{
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', {withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
                setTimeout(()=>{
                    navigate('/signin');
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data.message || "something went worng");
        }
    }

    const sidebarHandler = (textType)=>{
        if(textType === 'Home') {
            navigate("/");
        }else if(textType === 'Profile') {
            navigate("/Profile");
        }else if(textType === 'Chat') {
            navigate("/ChatPage");
        }else if(textType === 'Logout') {
            logoutHandler();
        }
        
    }

    const sidebarItems = [
        {icon:<Home/>,text:"Home"}, 
        {icon:<MessageCircleMore/>,text:"Chat"}, 
        {icon:<NotificationAddRounded/>,text:"Notification"}, 
        {icon:<Group/>,text:"Connection"}, 
        {icon:<OndemandVideo/>,text:"Media"},
        {icon:<Avatar style={{position:'relative', right:'0.5vw', top:'-0.8vh'}} src={shorts} sx={{width:40, height:40, "& img": {width: "60%",height: "60%",objectFit: "contain",opacity:'90%'},}}/>,text:<div style={{position:'relative', right:'1vw'}}>Shorts</div>}, 
        {icon:<Person/>,text:"Profile"},
        {icon:<Settings/>,text:"Settings"},
        {icon:<Logout/>,text:"Logout"}
    ]

    return(
        <>
        <div style={{display:'flex',borderRight:'1px solid black', flexDirection:'column', justifyContent:'space-between', height:'90vh', width:'15vw', marginTop:'0.5rem',marginLeft:'3rem', padding:'1.5rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                <div style={{cursor:'pointer', color:'red', fontFamily:'cursive', fontSize:'2rem', fontWeight:'bold'}}>TrueWeb</div>
                {sidebarItems.map(
                    (item, index)=>{
                        return(
                            <div style={{padding:'0.2rem', cursor:'pointer', display:'flex',fontWeight:'bold',height:'3vh', width:'11vw', backgroundColor: activeSection === item.text? 'gray':'', borderRadius:'0.5rem', color: activeSection === item.text? 'White' : ''}} key={index} onClick={()=>{sidebarHandler(item.text); activeSectionHandler(item.text)}} >
                                <div>{item.icon}</div>
                                <div style={{marginBottom:'4rem', marginLeft:'1rem', fontSize:'1.2rem'}}>{item.text}</div>
                            </div>
                        )
                    }
                )}
            </div>
            
            <div style={{display:'flex',backgroundColor:'gray', fontWeight:'bolder', width:'12vw',borderRadius:'1.25rem' }}> 
                <div><Avatar alt="Sudhir Kumar" src="/broken-image.jpg" sx={{width:40, height:40, bgcolor:deepOrange[400]}}/></div>
                <div style={{paddingTop:'0.5rem', paddingLeft:'0.5rem'}}>{user.name}</div>
            </div>
        </div>
        </>
    );
}
export default Sidebar;