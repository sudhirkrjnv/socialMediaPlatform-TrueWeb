import { Avatar } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import MessageIcon from '@mui/icons-material/Message';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import SettingsIcon from '@mui/icons-material/Settings';

import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
function Sidebar(){

    const [activeSection, setActiveSection] = useState('Home');
    let navigate = useNavigate();

    const activeSectionHandler = (section)=>{
        setActiveSection(section);
    }

    const sidebarHandler = (textType)=>{
        if(textType === 'Home') {
            navigate("/");
        }else if(textType === 'Profile') {
            navigate("/Profile");
        };
    }

    const sidebarItems = [{icon:<FeedIcon/>,text:"Home"}, {icon:<MessageIcon/>,text:"Messages"}, {icon:<ForumIcon/>,text:"Forums"}, {icon:<GroupIcon/>,text:"Connections"}, {icon:<PermMediaIcon/>,text:"Media"}, {icon:<SettingsIcon/>,text:"Settings"}]

    return(
        <>
        <div style={{display:'flex',borderRight:'1px solid black', flexDirection:'column', justifyContent:'space-between', height:'90vh', width:'15vw', marginTop:'0.5rem',marginLeft:'3rem', padding:'1.5rem'}}>
            <div>
                <h1 style={{paddingBottom:'1.5rem'}}>TrueWeb</h1>
                {sidebarItems.map(
                    (item, index)=>{
                        return(
                            <div style={{padding:'0.8rem', display:'flex',fontWeight:'bold',height:'3vh', width:'11vw', backgroundColor: activeSection === item.text? 'black':'', border: activeSection === item.text? '1px solid black':'',borderRadius:'0.5rem', color: activeSection === item.text? 'White' : ''}} key={index} onClick={()=>{sidebarHandler(item.text); activeSectionHandler(item.text)}} >
                                <div>{item.icon}</div>
                                <div style={{marginBottom:'4rem', marginLeft:'1rem', fontSize:'1.2rem'}}>{item.text}</div>
                            </div>
                        )
                    }
                )}
            </div>
            <div>
                <div style={{fontWeight:'bold'}}>Explore :</div>
                <div style={{height:'28vh', width:'14vw', display:'flex', flexWrap:'wrap',justifyContent:'center',alignItems:'center', gap:'0.5rem',overflow:'hidden', border:'1px solid #BDBDBD'}}>
                    {
                        [1,2,3,4].map((item, index)=>{
                            return(
                                <div key={index} style={{height:'6rem', width:'6rem', border:'1px solid #BDBDBD', flexShrink:'0px'}}></div>
                            )
                        })
                    }
                </div>
            </div>
            <div onClick={()=>{sidebarHandler("Profile");setActiveSection("Profile")}} style={{display:'flex', backgroundColor: activeSection === "Profile" ? 'black' : '', color: activeSection === "Profile" ? 'white' : '', fontWeight:'bolder', borderRadius:'1.25rem' }}> 
                <div className='AvatarCircle'><Avatar/></div>
                <div style={{paddingTop:'0.5rem', paddingLeft:'0.5rem'}}>Profile</div>
            </div>
        </div>
        </>
    );
}
export default Sidebar;