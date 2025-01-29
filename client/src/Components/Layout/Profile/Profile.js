import {School, Home, LocationOn, Favorite, Instagram, WhatsApp, EventNote} from '@mui/icons-material';
import coverPhoto from "./cover.jpg"
import { useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import { Avatar } from '@mui/material';
import Dialog from '../../../utils/dialogUtils';
import EditProfile from './EditProfile';
import moment from 'moment';

function Profile(){

    const profilePicRef = useRef();
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");

    const {user} = useSelector(store=>store.auth);

    const profilePicHandler = (e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImage(reader.result);
                }
            }
        }
    }

    const about = [
        {
            type: "Work and Education",
            items: [
                { icon: <School />, dscpn: user?.workEducation?.university },
                { icon: <School />, dscpn: user?.workEducation?.college },
                { icon: <School />, dscpn: user?.workEducation?.school }
            ]
        },
        {
            type: "Locations",
            items: [
                { icon: <LocationOn />, dscpn: user?.locations?.currentLocation },
                { icon: <Home />, dscpn: user?.locations?.permanentLocation }
            ]
        },
        {
            type: "Contact & Basic Info.",
            items: [
                { icon: <WhatsApp />, dscpn: user?.contactInfo?.whatsapp },
                { icon: <Instagram />, dscpn: user?.contactInfo?.instagram }
            ]
        },
        {
            type: "Family & Relationships",
            items: [
                { icon: <Favorite />, dscpn: user?.familyRelationships },
                { icon: <EventNote />, dscpn: user?.dob ? moment(user.dob).format("MMM DD, YYYY") : "" }
            ]
        }
    ];


    return(
        <>
            <div style={{height:'100vh', width:'80vw', display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', gap:'1vw', height:'60%', width:'100%', margin:'auto', overflow:'hidden'}}>
                    <div style={{position:'relative',height:'60vh', width:'40vw', display:'flex', justifyContent:'center', gap:'1vh'}}>
                        {/* cover Picture */}
                        <div style={{ position:'relative',color:'red', width:'100%', height:'80%' , marginTop:'1vh', display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
                            {
                                (user?.coverPicture) ?
                                    <img src={user?.coverPicture} alt="Cover Photo" style={{ height: '100%', width: '100%', objectFit: 'cover'}}/> : <img src={coverPhoto} alt="Cover Photo" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'0.5rem'}}/>
                            }
                                <input type='file' ref={profilePicRef} onChange={(e)=>profilePicHandler(e)} style={{display:'none'}}/>
                                <button style={{position:'absolute', borderRadius:'5px', bottom:'5vh'}} onClick={()=>profilePicRef.current.click()}>Change Cover Picture</button>
                        </div>
                        {/* Profile Picture */}
                        <div style={{height:'10vw', position:'absolute', bottom:'4vh', left:'0.5vw' ,borderRadius: '50%', border:'0.5px solid black', width:'10vw', borderRadius:'20vh',overflow:'hidden'}}>
                            {
                                (user?.profilePicture) ? 
                                    <img src={user?.profilePicture} alt="Profile Pic" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'1rem' }}/> :
                                    <Avatar alt="Profile Pic" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'1rem' }}/>  
                            }
                        </div>
                        {/* Edit Profile Section */}
                        <button onClick={(e)=>setOpen(true)} style={{position:'absolute',bottom:'3vh', right:'1vw', borderRadius:'5px',border:'none', backgroundColor:'green', padding:'8px'}}>
                            <b> 🖋️ Edit Profile</b>
                        </button>
                        {
                            open && <Dialog open={open} onClose={() => setOpen(false)} overlayStyles={{display:'flex', justifyContent:'center'}} dialogStyles={{padding: '1rem', top:'1vh' , height:'90vh'}}>
                                <EditProfile onClose={() => setOpen(false)}/>
                            </Dialog>
                        }
                        {/* Add to story section */}
                        <button style={{position:'absolute',bottom:'3vh', right:'9vw', borderRadius:'5px',border:'none', color:'white', backgroundColor:'darkBlue', padding:'8px'}}>
                             ➕ Add to Story
                        </button>
                        <div style={{position:'absolute',bottom:'8vh', left:'11vw'}}><h1>{user?.name}</h1></div>
                    </div>
                    <div style={{height:'50vh', width:'50vw'}}>
                            {/* Follow, unfollow, followers and Followings */}
                            <div style={{display:'flex', gap:'3vw'}}>
                                <h5>username : {user?.username} <button style={{color:'white', backgroundColor:'green', fontFamily:'fantasy'}}>Follow</button></h5>
                                <div style={{display:'flex', gap:'3vw', justifyContent:'center', alignItems:'center'}}>
                                    <div><b>{user?.followers.length} Followers</b></div>
                                    <div><b>{user?.following.length} Followings</b></div>
                                </div>
                            </div>
                            {/* Bio */}
                            <div>
                                <div><b>Bio : </b></div>
                                <textarea type='text' readOnly='true' placeholder='bio' value={user?.bio || ""} style={{height:'100%', width:'40%', border:'none',background:'none', outline:'none', fontWeight:'bolder', marginTop:'1vh'}}/>
                            </div>
                            <div>

                                {/* About Section */}
                                <div><b>About :</b>
                                    <div style={{display:'flex', gap:'2vw'}}>
                                        {/* About type */}
                                        <div style={{borderRight:'1px solid #ccc', width:'25%', display:'flex', flexDirection:'column', gap:'2vh'}}>
                                            <div style={{fontWeight:'bold', marginTop:'2vh'}}>Overview</div>
                                            {
                                                about.map((item, index)=>{
                                                    return(
                                                        <div key={index}>{item.type}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                        {/* Description */}
                                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'30vw', gap:'1vh', position:'relative', top:'-1.5vh'}}>
                                        {
                                            about.map((item, index)=>
                                                item.items.map((item, index)=>
                                                    <div key={index} style={{display:'flex', gap:'1vw'}}>
                                                        <div>{item.icon}</div>
                                                        <div>{item.dscpn}</div>   
                                                    </div>
                                                )                                                      
                                            )
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div style={{height:'40%'}}>
                    <div style={{display:'flex', justifyContent:'center', gap:'10%'}}>
                        <div style={{fontWeight:'bolder'}}>Photo</div>
                        <div style={{fontWeight:'bolder'}}>Shorts</div>
                        <div style={{fontWeight:'bolder'}}>Media</div>
                        <div style={{fontWeight:'bolder'}}>Post</div>
                    </div>
                    <hr/>
                </div>
            </div>
        </>
    );
}
export default Profile;