import {School, Home, LocationOn, Favorite, Instagram, WhatsApp, LinkedIn, Facebook} from '@mui/icons-material';
import coverPhoto from "./cover.jpg"
import { useRef, useState } from 'react';
import { Avatar } from '@mui/material';

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

    const [educationList, setEducationList] = useState([{ id: Date.now(), type: "", name: "", degree: "", year: "" }]);
    const [socialList, setSociaList] = useState([{id:Date.now(), type:"", username:""}])
    
    const handleAddEducation = ()=> {
        setEducationList([...educationList, { id: Date.now(), type: "", name: "", degree: "", year: "" }]);
    };

    const handleAddSocial = ()=>{
        setSociaList([...socialList, {id:Date.now(), type:"", username:""}])
    }
    
    const handleEducationalInputChange = (id, field, value) => {
        const updatedList = educationList.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        );
        setEducationList(updatedList);
    };
    
    const handleRemoveEntry = (id) => {
        const updatedList = educationList.filter((entry) => entry.id !== id);
        setEducationList(updatedList);
    };
    

    


    return(
        <>
            <div>
                <div><center><b>Edit Profile</b></center></div>
                <hr/>
                <div className='scrolldisable' style={{display:'flex', flexDirection:'column', height:'85vh', overflowY:'scroll'}}>
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}>  
                        <img src={coverImage} alt="Cover Photo" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'0.5rem'}}/>              
                        <input type='file' ref={coverPicRef} onChange={(e)=>coverPicHandler(e)} style={{display:'none'}}/>
                        <button style={{borderRadius:'4px', border:'none', padding:'8px',marginTop:'0.4vh', backgroundColor:'#ccc'}} onClick={()=>coverPicRef.current.click()}><b>Change Cover Picture</b></button>
                    </div><br/>
                    <div style={{width:'40vw', height:'40vh' , marginTop:'1vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'20vw', height:'20vw'}}>
                            <img src={image} alt="profilePic" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'12.5vw'}}/>              
                        </div> 
                        <input type='file' ref={profilePicRef} onChange={(e)=>profilePicHandler(e)} style={{display:'none'}}/>
                        <button style={{marginTop:'0.4vh', backgroundColor:'#ccc', padding:'8px', borderRadius:'4px', border:'none'}} onClick={()=>profilePicRef.current.click()}><b>Change Profile Picture</b></button>
                    </div><br/>
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column', alignItems:'center'}}> 
                        <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                            <div><b>Bio</b></div>
                            <div><button style={{border:'none', padding:'8px', borderRadius:'4px'}}><b>+ Add</b></button></div>
                        </div>
                        <div style={{width:'35vw', height:'8vh', backgroundColor:'green'}}><textarea type='text' placeholder='add bio' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/></div>
                    </div><br/>
                    <div style={{width:'40vw', marginTop:'2vh', display:'flex', flexDirection:'column'}}>     
                        <div><b>About</b></div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Work and Education</b></div>
                        <div style={{ padding: "1rem"}}>
                        {
                            educationList.map((item, index) => (
                                <div key={item.id} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px"}}>
                                    <label style={{ display: "block", marginBottom: "10px" }}><b>Education Type</b>
                                        <select value={item.type} onChange={(e) => handleEducationalInputChange(item.id, "type", e.target.value)} style={{display: "block",width: "100%",padding: "8px",marginTop: "5px",border: "1px solid #ccc",borderRadius: "4px"}}>
                                            <option value="">Select Type</option>
                                            <option value="University">University</option>
                                            <option value="College">College</option>
                                            <option value="School">School</option>
                                        </select>
                                    </label>
                                    <label style={{ display: "block", marginBottom: "10px" }}> <b>Institution Name</b> 
                                        <input type="text" placeholder="Enter name" value={item.name} onChange={(e) => handleEducationalInputChange(item.id, "name", e.target.value)} style={{ display: "block", width: "96%", padding: "8px", marginTop: "5px", order: "1px solid #ccc",borderRadius: "4px"}}/>
                                    </label>
                                    <label style={{ display: "block", marginBottom: "10px" }}><b>Degree/Course</b>
                                        <input type="text" placeholder="Enter location" value={item.degree} onChange={(e) => handleEducationalInputChange(item.id, "degree", e.target.value)} style={{display: "block",width: "96%",padding: "8px",marginTop: "5px",border: "1px solid #ccc",borderRadius: "4px"}}/>
                                    </label>
                                    <label style={{ display: "block", marginBottom: "10px" }}><b>Year</b>
                                        <input type="text" placeholder="Enter year (e.g., 2020-2024)" value={item.year} onChange={(e) => handleEducationalInputChange(item.id, "year", e.target.value)} style={{display: "block",width: "96%",padding: "8px",marginTop: "5px",border: "1px solid #ccc",borderRadius: "4px"}}/>
                                    </label>

                                    {educationList.length > 1 && (
                                        <button onClick={()=> handleRemoveEntry(item.id)} style={{marginTop: "10px",padding: "8px 12px",backgroundColor: "#ff4d4d",color: "#fff",border: "none",borderRadius: "4px",cursor: "pointer",}}>
                                            Remove
                                        </button>
                                        )
                                    }
                                </div>
                            ))
                        }

                        <button onClick={()=>handleAddEducation()} style={{display: "block", margin: "0 auto", padding: "10px 15px", backgroundColor: "#ccc", color: "black",fontWeight:'bold', border: "none", borderRadius: "4px", cursor: "pointer"}}>
                            + Add Another
                        </button>

                        {educationList.some(
                            (entry) => entry.type && entry.name && entry.degree && entry.year) ? 
                            (
                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                {
                                    educationList.map((entry, index) => entry.type || entry.name || entry.location || entry.degree || entry.year ? 
                                    (
                                        <li key={index} style={{marginBottom: "10px",padding: "10px",backgroundColor: "#e9ecef",borderRadius: "4px"}}>
                                            {entry.type},
                                            {entry.name},
                                            {entry.degree},
                                            {entry.year}
                                        </li>
                                    ) : null
                                )}
                                </ul>
                            ) : null
                        }
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Current Location</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><LocationOn/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Current Location</span></div>
                                    <div><button style={{border:'none', padding:'8px', borderRadius:'4px'}}><b>+ Add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add current location' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Permanent Location</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Home/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Current Location</span></div>
                                    <div><button style={{border:'none', padding:'8px', borderRadius:'4px'}}><b>+ Add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='add Permanent Address' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Contact & Basic Info.</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            {
                                socialList.map((item,index)=>
                                    <div key={item.id} style={{display:'flex', gap:'5px'}}>
                                        <select value={item.type} style={{width: "30%",padding: "8px",marginTop: "5px",border: "1px solid #ccc",borderRadius: "4px"}}>
                                            <option>Select</option>
                                            <option value="WhatsApp"><WhatsApp/> &nbsp; WhatsApp</option>
                                            <option value="Instagram"><Instagram/> &nbsp; Instagram</option>
                                            <option value="Instagram"><LinkedIn/> &nbsp; LinkedIn</option>
                                            <option value="Facebook"><Facebook/> &nbsp; Facebook</option>
                                        </select>
                                        <input type='text' style={{width: "60%",padding: "8px",marginTop: "5px",border: "1px solid #ccc",borderRadius: "4px"}}/>
                                    </div>
                                )
                            }
                            <div><center><button onClick={()=>handleAddSocial()} style={{backgroundColor:'#ccc', border:'none', padding:'8px', borderRadius:'4px', marginTop:'1vh'}}><b>+ Add Another</b></button></center></div>
                        </div>
                        <div style={{marginLeft:'1vw', marginTop:'1vh'}}><b>Family & Relationships</b></div>
                        <div style={{marginLeft:'2vw'}}>
                            <div>
                                <div style={{width:'100%' ,display:'flex', justifyContent:'space-between'}}>
                                    <div><Favorite/><span style={{position:'relative', bottom:'1vh', left:'0.5vw'}}>Family&Relationships</span></div>
                                    <div><button style={{border:'none', padding:'8px', borderRadius:'4px'}}><b>+ Add</b></button></div>
                                </div>
                                <div style={{width:'35vw', height:'5vh', backgroundColor:'green'}}>
                                    <textarea type='text' placeholder='Enter your marital Status' style={{width:'100%', height:'100%', textAlign:'center', border:'none', outline:'none', padding:'5px'}}/>
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