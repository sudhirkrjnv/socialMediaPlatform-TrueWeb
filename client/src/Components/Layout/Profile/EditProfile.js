import {School, Home, LocationOn, Favorite, Instagram, WhatsApp} from '@mui/icons-material';
import coverPhoto from "./cover.jpg"
import { useRef, useState } from 'react';

function EditProfile(){

    const coverImageRef = useRef();
    const profilePicRef = useRef();
    const [profilePic, setProfilePic] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [bio, setBio] = useState("");
    const [university, setUniversity] = useState("");
    const [college, setCollege] = useState("");
    const [school, setSchool] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");
    const [permanentLocation, setPermanentLocation] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [instagram, setInstagram] = useState("");
    const [relationship, setRelationship] = useState("");
    
    
    const coverImageHandler = (e)=>{
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
                    setProfilePic(reader.result);
                }
            }
        }
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);  
    };

    const handleSaveInfo = () => {
        const userData = {
            profilePic,
            coverImage,
            bio,
            gender,
            dob,
            workEducation: {
                university,
                college,
                school
            },
            locations: {
                currentLocation,
                permanentLocation
            },
            contactInfo: {
                whatsapp,
                instagram
            },
            relationship
        };
        console.log(userData);
    };

    return(
        <>
            <div>
                <div><center><b>Edit Profile</b></center></div>
                <hr/>
                <div className='scrolldisable' style={{display:'flex', flexDirection:'column', height:'85vh', overflowY:'scroll'}}>
                    {/*  Cover Picture */}
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}>  
                        <img src={coverImage} alt="Cover Photo" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'0.5rem'}}/>              
                        <input type='file' ref={coverImageRef} onChange={(e)=>coverImageHandler(e)} style={{display:'none'}}/>
                        <button style={{borderRadius:'5px', marginTop:'0.4vh'}} onClick={()=>coverImageRef.current.click()}>Change Cover Picture</button>
                    </div><br/>

                    {/* Profile Picture */}
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'20vw', height:'20vw'}}>
                            <img src={profilePic} alt="profilePic" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'12.5vw'}}/>              
                        </div> 
                        <input type='file' ref={profilePicRef} onChange={(e)=>profilePicHandler(e)} style={{display:'none'}}/>
                        <button style={{borderRadius:'5px', marginTop:'0.4vh'}} onClick={()=>profilePicRef.current.click()}>Change Profile Picture</button>
                    </div><br/>

                    {/* Name */}
                    <div style={{ width: '40vw', marginTop: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <div><b>Name</b></div>
                            <div><button style={{ borderRadius: '5px' }}><b>+ add</b></button></div>
                        </div>
                        <div style={{ width: '35vw', height: '8vh' }}>
                            <input type='text' placeholder='Your name' value={name} onChange={handleInputChange(setName)} style={{ width: '100%', height: '100%', textAlign: 'center', border: 'none', outline: 'none', padding: '5px' }} />
                        </div>
                    </div><br />
                    {/* Bio */}
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                            <div><b>Bio</b></div>
                            <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                        </div>
                        <div style={{width:'35vw', height:'8vh', backgroundColor:'green'}}><textarea type='text' placeholder='add bio' value={bio} onChange={handleInputChange(setBio)} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/></div>
                    </div><br/>
                    {/*           ABOUT              */}
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column'}}>     
                        <div><b>About</b></div>

                        {/* Gender */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Gender</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                <div style={{ width: "100%", marginTop: "1vh" }}>
                                    <select value={gender} onChange={handleInputChange(setGender)} style={{width: "90%",height: "5vh",textAlign: "center",border: "1px solid #ccc",borderRadius: "5px",padding: "5px",outline: "none"}}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>                           
                        </div><br/>
                        {/* Date Of Birth */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Date of Birth</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                <div style={{ width: "100%", marginTop: "1vh" }}>
                                    <input type="date" value={dob} onChange={handleInputChange(setDob)} style={{width: "90%",height: "5vh",textAlign: "center",border: "1px solid #ccc",borderRadius: "5px",padding: "5px",outline: "none"}}/>
                                </div>
                            </div>                           
                        </div>
                        <div style={{width: "35vw",marginTop: "2vh",display: "flex",flexDirection: "column",alignItems: "center"}}>
                        </div><br/>
                        {/* Work and Education */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Work and Education</b></div>
                        <div style={{marginLeft:'2vw'}}>
                        {
                            ["University", "College", "School"].map((item, index) => (
                                <div key={index} style={{ marginLeft: '1vw', marginTop: '1vh' }}>
                                    <div><LocationOn/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>{item}</span></div>
                                    <textarea placeholder={`Add ${item}`}
                                        value={item === "University" ? university : item === "College" ? college : school}
                                        onChange={handleInputChange(item === "University" ? setUniversity : item === "College" ? setCollege : setSchool)}
                                        style={{ width: '35vw', height: '5vh', textAlign: 'center', border: 'none', outline: 'none', padding: '5px' }}
                                    />
                                </div>
                            ))
                        }
                        </div>
                        {/* Current Location */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Current Location</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><LocationOn/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Current Location</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add current location'  value={currentLocation} onChange={handleInputChange(setCurrentLocation)}style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        {/* Permanent Location */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Permanent Location</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Home/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Permanent Location</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add Permanent Address' value={permanentLocation} onChange={handleInputChange(setPermanentLocation)} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        {/* Contact and Basic Info. */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Contact & Basic Info.</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><WhatsApp/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>WhatsApp</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='WhatsApp Account' value={whatsapp} onChange={handleInputChange(setWhatsapp)} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Instagram/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Instagram</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='Instagram Id Account' value={instagram} onChange={handleInputChange(setInstagram)} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        {/* Family and Relationship */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Family & Relationships</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Favorite/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Family&Relationships</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='Enter your Marital Status' value={relationship} onChange={handleInputChange(setRelationship)} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                    </div><br/>

                    {/* SAVE ALL INFORMATION */}
                    <button onClick={handleSaveInfo} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px' }}>Save</button>
                </div>
            </div>
        </>
    );
}
export default EditProfile;