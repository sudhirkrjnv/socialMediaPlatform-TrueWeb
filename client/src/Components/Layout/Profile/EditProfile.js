import {School, Home, LocationOn, Favorite, Instagram, WhatsApp} from '@mui/icons-material';
import { useRef, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from "axios"
import { setAuthUser } from '../../../redux/authSlice';
import moment from "moment"
import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

function EditProfile({onClose}){

    const {user} = useSelector(store=>store.auth);
    
 
    const coverImageRef = useRef();
    const profilePicRef = useRef();
    
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({
        profilePicture:user?.profilePicture,
        coverPicture:user?.coverPicture,
        name:user?.name,
        gender:user?.gender,
        dob: user?.dob,
        bio:user?.bio,
        relationship:user?.familyRelationships,
        workEducation: {
            university:user?.workEducation?.university,
            college:user?.workEducation?.college,
            school:user?.workEducation?.school,
        },
        locations: {
            currentLocation:user?.locations?.currentLocation,
            permanentLocation:user?.locations?.permanentLocation
        },
        contactInfo: {
            whatsapp:user?.contactInfo?.whatsapp,
            instagram:user?.contactInfo?.instagram
        }
        
    })

    const [loading, setLoading] = useState(false);

    const profileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePicture: file });
    };

    const coverChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, coverPicture: file });
    };
    
    const selectChangeHandler = (value)=>{
        setInput({...input, gender:value})
    }

    
    const workEducationType = [
        { type: 'university', icon: <School /> },
        { type: 'college', icon: <School /> },
        { type: 'school', icon: <School /> },
    ];
    
    
    const handleSaveInfo = async()=>{
        console.log(input);
        
        const formData = new FormData();
        
        // formData.append("name", input.name);
        // formData.append("gender", input.gender);
        // formData.append("dob", input.dob);
        // formData.append("bio", input.bio);
        // formData.append("relationship", input.relationship);
        // formData.append("workEducation", input.workEducation);
        // formData.append("locations", input.locations);
        // formData.append("contactInfo", input.contactInfo);
        // if(input.profilePic) formData.append("profilePic", input.profilePic);
        // if(input.coverImage) formData.append("coverImage", input.coverImage);

        ["name", "gender", "dob", "bio", "relationship", "workEducation", "locations", "contactInfo", "profilePicture", "coverPicture"].map((item) => {          
            if (item === "dob") {
                formData.append(item, moment(input.dob).format("MMM DD, YYYY"));
            } else {
                formData.append(item, input[item]);
            }         
        });

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/profile/editProfile', input, {
                headers:{
                  'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            })
            if(res.data.success){
                const updatedData = { 
                    ...user,
                    name:res.data.user?.name,
                    gender:res.data.user?.gender,
                    dob:res.data.user?.dob,
                    bio:res.data.user?.bio,
                    relationship:res.data.user?.relationship,
                    workEducation:res.data.user?.workEducation,
                    locations:res.data.user?.locations,
                    contactInfo:res.data.user?.contactInfo,
                    profilePicture:res.data.user?.profilePicture,
                    coverPicture:res.data.user?.coverPicture
                }

                dispatch(setAuthUser(updatedData));
                toast.success(res.data.message);
                
            }
        } catch (error) {
            toast.error(error.response?.data.message || "something went worng");
        } finally {
            setLoading(false);
            onClose();
        }
    }
  
    return(
        <>
            <div>
                <div><center><b>Edit Profile</b></center></div>
                <hr/>
                <div className='scrolldisable' style={{display:'flex', flexDirection:'column', height:'85vh', overflowY:'scroll'}}>
                    {/*  Cover Picture */}
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}>  
                        <div style={{width:'35vw', height:'20vw'}}>            
                            <img src={user.coverPicture} alt="Cover Photo" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'0.5rem'}}/>              
                        </div> 
                        <input type='file' ref={coverImageRef} onChange={coverChangeHandler} style={{display:'none'}}/>
                        <button style={{borderRadius:'5px', marginTop:'0.4vh', zIndex:'1'}} onClick={()=>coverImageRef.current.click()}>Change Cover Picture</button>
                    </div><br/>

                    {/* Profile Picture */}
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'20vw', height:'20vw'}}>
                            <img src={user.profilePicture} alt="profilePic" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'12.5vw'}}/>              
                        </div> 
                        <input type='file' ref={profilePicRef} onChange={profileChangeHandler} style={{display:'none'}}/>
                        <button style={{borderRadius:'5px', marginTop:'0.4vh', zIndex:'1'}} onClick={()=>profilePicRef.current.click()}>Change Profile Picture</button>
                    </div><br/>

                    {/* Name */}
                    <div style={{ width: '40vw', marginTop: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <div><b>Name</b></div>
                            <div><button style={{ borderRadius: '5px' }}><b>+ add</b></button></div>
                        </div>
                        <div style={{ width: '35vw', height: '8vh' }}>
                            <input type='text' placeholder='Your name' value={input.name} onChange={(e)=>setInput({...input, name:e.target.value})} style={{ width: '100%', height: '100%', textAlign: 'center', border: 'none', outline: 'none', padding: '5px' }} />
                        </div>
                    </div><br />
                    {/* Bio */}
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                            <div><b>Bio</b></div>
                            <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                        </div>
                        <div style={{width:'35vw', height:'8vh', backgroundColor:'green'}}>
                            <textarea type='text' placeholder='add bio' value={input.bio} onChange={(e)=>setInput({...input, bio:e.target.value})} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                        </div>
                    </div><br/>
                    {/*           ABOUT              */}
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column'}}>     
                        <div><b>About</b></div>

                        {/* Gender */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Gender</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                <div style={{ width: "100%", marginTop: "1vh" }}>
                                    <select defaultValue={input.gender} onChange={(e) => selectChangeHandler(e.target.value)} style={{width: "90%",height: "5vh",textAlign: "center",border: "1px solid #ccc",borderRadius: "5px",padding: "5px",outline: "none"}}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>                           
                        </div><br/>
                        {/* Date Of Birth */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Date of Birth</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                <div style={{ width: "100%", marginTop: "1vh" }}>
                                    <input type="date" value={moment(input.dob).format("YYYY-MM-DD")} onChange={(e)=>setInput({...input, dob:e.target.value})} style={{width: "90%",height: "5vh",textAlign: "center",border: "1px solid #ccc",borderRadius: "5px",padding: "5px",outline: "none"}}/>
                                </div>
                            </div>                           
                        </div>
                        <div style={{width: "35vw",marginTop: "2vh",display: "flex",flexDirection: "column",alignItems: "center"}}>
                        </div><br/>
                        {/* Work and Education */}
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Work and Education</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            {
                                workEducationType.map(({ type, icon }) => (
                                    <div key={type} style={{ marginLeft: '1vw', marginTop: '1vh' }}>
                                        <div> 
                                            {icon} <span style={{ position: 'relative', bottom: '1vh', left: '0.5vw' }}> {type} </span>
                                        </div>
                                        <input type="text" placeholder={`Add ${type}`} value={input.workEducation[type]} onChange={(e)=>setInput((prev) => ({...prev, workEducation: { ...prev.workEducation, [type]: e.target.value }}))} style={{width: '35vw',height: '5vh',textAlign: 'center',border: '1px solid #ccc',borderRadius: '5px',padding: '5px',outline: 'none',}}/>
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
                                    <textarea type='text' placeholder='add current location'  
                                    value={input.locations.currentLocation} onChange={(e)=>setInput({...input, locations: { ...input.locations, currentLocation: e.target.value }})} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
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
                                    <textarea type='text' value={input.locations.permanentLocation} onChange={(e)=>setInput({...input, locations: { ...input.locations, permanentLocation: e.target.value }})} placeholder='add Permanent Address' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
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
                                    <textarea type='text' value={input.contactInfo.whatsapp} onChange={(e)=>setInput({...input, contactInfo:{...input.contactInfo, whatsapp:e.target.value}})} placeholder='WhatsApp Account' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Instagram/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Instagram</span></div>
                                    <div><button style={{borderRadius:'5px'}}><b>+ add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='Instagram Id Account' value={input.contactInfo.instagram} onChange={(e)=>setInput({...input, contactInfo:{...input.contactInfo, instagram:e.target.value}})} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
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
                                    <textarea type='text' placeholder='Enter your Marital Status' value={user?.familyRelationships} onChange={(e)=>setInput({...input, relationship:e.target.value})} style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                    </div><br/>

                    {/* SAVE ALL INFORMATION */}
                    {
                        loading? 
                        <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px', display:'flex', alignItems:'center', justifyContent:'center', gap:'1vw' }}>Please wait <CircularProgress size={18}  style={{color:'#fff'}}/></button> 
                            : 
                            <button onClick={handleSaveInfo} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px' }}>Save</button>
                    }
                </div>
            </div>
        </>
    );
}
export default EditProfile;