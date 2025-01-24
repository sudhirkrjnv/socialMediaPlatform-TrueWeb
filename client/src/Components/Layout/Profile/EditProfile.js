import {School, Home, LocationOn, Favorite, Instagram, WhatsApp} from '@mui/icons-material';
import coverPhoto from "./cover.jpg"
import { useRef, useState } from 'react';

function EditProfile(){

    const coverPicRef = useRef();
    const profilePicRef = useRef();
    const [image, setImage] = useState("");
    const [coverImage, setCoverImage] = useState("");


    const coverPicHandler = (e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setCoverImage(reader.result);
                }
            }
        }
    }
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

    


    return(
        <>
            <div>
                <div><center><b>Edit Profile</b></center></div>
                <hr/>
                <div className='scrolldisable' style={{display:'flex', flexDirection:'column', height:'85vh', overflowY:'scroll'}}>
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}>  
                        <img src={coverImage} alt="Cover Photo" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'0.5rem'}}/>              
                        <input type='file' ref={coverPicRef} onChange={(e)=>coverPicHandler(e)} style={{display:'none'}}/>
                        <button style={{borderRadius:'5px', marginTop:'0.4vh'}} onClick={()=>coverPicRef.current.click()}>Change Cover Picture</button>
                    </div><br/>
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'20vw', height:'20vw'}}>
                            <img src={image} alt="profilePic" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'12.5vw'}}/>              
                        </div> 
                        <input type='file' ref={profilePicRef} onChange={(e)=>profilePicHandler(e)} style={{display:'none'}}/>
                        <button style={{borderRadius:'5px', marginTop:'0.4vh'}} onClick={()=>profilePicRef.current.click()}>Change Profile Picture</button>
                    </div><br/>
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                            <div><b>Bio</b></div>
                            <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                        </div>
                        <div style={{width:'40vw', height:'8vh', backgroundColor:'green'}}><textarea type='text' placeholder='add bio' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/></div>
                    </div><br/>
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column'}}>     
                        <div><b>About</b></div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Work and Education</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><School/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>University</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add University' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><School/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>College</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add College' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><School/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>School</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add School' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Current Location</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><LocationOn/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Current Location</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add current location' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Permanent Location</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Home/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Current Location</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add Permanent Address' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Contact & Basic Info.</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><WhatsApp/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>WhatsApp</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='WhatsApp Account' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Instagram/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Instagram</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='Instagram Id Account' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Family & Relationships</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Favorite/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Family&Relationships</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'40vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='Instagram Id Account' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                    </div><br/>
                </div>
            </div>
        </>
    );
}
export default EditProfile;