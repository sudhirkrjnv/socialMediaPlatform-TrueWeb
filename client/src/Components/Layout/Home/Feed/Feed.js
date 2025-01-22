import './Feed.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange, red, green , blue} from '@mui/material/colors';
import {FavoriteBorder, Favorite, BookmarkBorder, Bookmark, TextsmsOutlined,Textsms, Send, Folder, PhotoCamera, Place} from '@mui/icons-material';
import { useRef, useState } from 'react';
import Dialog from '../../../../utils/dialogUtils';

function Feed(){

    const [open, setOpen] = useState(false);
    //const dialogRef = useRef();
    const imageRef = useRef();

    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    
    const [imagePreview, setImagePreview] = useState("");

    /*const dialogHandler = (e) => {
        if (dialogRef.current === e.target) {
            setOpen(false);
        }
    };*/

    const fileChangeHandler = (e)=>{
        const file = e.target.files[0];
        if(file){
            setFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>{
                if(reader.readyState === 2){
                    setImagePreview(reader.result);
                }
            }
        }
    }

    const liked =[
        {userId:'01', name:"Anjali Kumari"},
        {userId:'02', name:"Priya Kumari"}
    ]
    const comments =[
        {text:"hello"}
    ]
    const Bookmarks =[
        {userId:'01', name:"Anjali Kumari"}
    ]

    return(
        <>
            <div style={{paddingLeft:'2rem'}}>
                <div className='addpostbutton'>
                    <div style={{display:'flex', alignItems:'center', width:'37rem',height:'2.5rem', borderRadius:'1.25rem',backgroundColor:'white', marginLeft:'2rem', border:'0.5px solid #BDBDBD'}}>
                        <div style={{width:'2.5rem', height:'2.5rem',borderRadius:'1.25rem', background:'black'}}>
                        <Avatar alt="Sudhir Kumar" src="/broken-image.jpg" sx={{width:40, height:40, bgcolor:deepOrange[400]}}/>
                        </div>
                        <input style={{paddingLeft:'1rem', paddingRight:'1rem', width:'32vw', border:'none', outline:'none'}} type='text' placeholder='share something'/>
                        <div>😊</div>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'3rem', paddingRight:'1.5rem'}}>
                        <div style={{display:'flex', gap:'2vw', alignItems:'center'}}>
                            <div onClick={()=>setOpen(true)} style={{cursor:'pointer'}}>
                                <Folder sx={{width:25, height:25, color:blue[800]}}/>
                                <span style={{position:'relative', top:'-6px'}}>File</span> 
                            </div>
                            {
                                open && 
                                <Dialog open={open} onClose={() => setOpen(false)} overlayStyles={{display:'flex', justifyContent:'center'}} dialogStyles={{padding: '1rem', top:'15vh' }}>
                                    <>
                                        <div style={{display:'flex', alignItems:'center', gap:'0.5vw', margin:'1vh 0.5vw 1vh 3vw'}}>
                                            <Avatar style={{cursor:'pointer'}}/><span style={{cursor:'pointer'}}><b>Sudhir Kumar</b></span>
                                        </div>
                                            <div style={{width:'85%', display:'flex', margin:'auto',paddingTop:'15px', paddingBottom:'15px', borderRadius:'0.5rem'}}>
                                                {/*        Caption            */}
                                                <textarea name='caption' value={caption} onChange={(e)=>setCaption(e.target.value)} style={{width:'100%', border:'none', outline:'none', paddingLeft:'10px', paddingRight:'10px'}} type='text' placeholder="About your Post"/>    
                                            </div>
                                            <div style={{display:'flex', alignItems:'center', height:'60%', width:'85%', justifyContent:'center', backgroundColor:'rgb(189,189,189)', margin:'auto',marginTop:'5px', border:'1px solid black', borderRadius:'1rem'}}>
                                                {/*        Post Image        */}
                                                {
                                                    imagePreview ? <img src={imagePreview} alt="post.image" style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:'1rem'}}/> : 
                                                    <div>
                                                            <input ref={imageRef} type='file' onChange={(e)=>fileChangeHandler(e)} style={{zIndex:'-1' ,position:'absolute' }}/>
                                                                <div onClick={()=>imageRef.current.click()} style={{ backgroundColor:'blue',cursor:'pointer', color:'white', display:'flex', justifyContent:'center', alignItems:'center', height:'6vh', width:'15vw', borderRadius:'1rem'}}>
                                                                    <span>Choose from Computer</span>
                                                                </div>
                                                        </div>
                                                }
                                            </div>
                                            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',marginRight:'5vw', height:'15%', margin:'auto'}}>
                                                {
                                                    imagePreview ? <button  type="submit" style={{borderRadius:'0.5rem', cursor:'pointer', border:'none',height:'50%', width:'15%', backgroundColor: 'green', opacity: '100%', color:'white'}}>
                                                        Submit
                                                    </button> : <button style={{borderRadius:'0.5rem', cursor:'pointer', border:'none',height:'50%', width:'15%', backgroundColor:'gray', opacity: '10%',color:'white'}}>
                                                        Submit
                                                    </button>
                                                }
                                                                
                                            </div>
                                        </>
                                    </Dialog>
                            }
                                {/*
                                    open && <div>
                                                <div ref={dialogRef} onClick={(e) => dialogHandler(e)} style={{position:'fixed', inset:'0', backgroundColor:'rgba(0,0,0, 0.5)', zIndex:'1', display:'flex', justifyContent:'center'}}>
                                                    <div style={{width:'40vw', height:'65vh', backgroundColor:'white', borderRadius:'1rem', position:'relative', top:'15vh'}}>
                                                        <div style={{position:'absolute', top:'1vh', right:'1vw', display:'flex', justifyContent:'flex-end', height:'5%', width:'4%'}}>
                                                            <div onClick={()=>setOpen(false)} style={{backgroundColor:'red', height:'1.5rem', width:'1.5rem', display:'flex', justifyContent:'center', alignItems:'center', color:'white', borderRadius:'0.3rem'}}>
                                                                <span style={{cursor:'pointer'}}><b>X</b></span>
                                                            </div>
                                                        </div>
                                                        <div style={{display:'flex', alignItems:'center', gap:'0.5vw', margin:'1vh 0.5vw 1vh 3vw'}}>
                                                            <Avatar style={{cursor:'pointer'}}/><span style={{cursor:'pointer'}}><b>Sudhir Kumar</b></span>
                                                        </div>
                                                        <div style={{width:'85%', display:'flex', margin:'auto',paddingTop:'15px', paddingBottom:'15px', borderRadius:'0.5rem'}}>
                                                                     
                                                            <textarea name='caption' value={caption} onChange={(e)=>setCaption(e.target.value)} style={{width:'100%', border:'none', outline:'none', paddingLeft:'10px', paddingRight:'10px'}} type='text' placeholder="About your Post"/>    
                                                        </div>
                                                        <div style={{display:'flex', alignItems:'center', height:'60%', width:'85%', justifyContent:'center', backgroundColor:'rgb(189,189,189)', margin:'auto',marginTop:'5px', border:'1px solid black', borderRadius:'1rem'}}>
                                                            {
                                                                imagePreview ? <img src={imagePreview} alt="post.image" style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:'1rem'}}/> : 
                                                                    <div>
                                                                        <input ref={imageRef} type='file' onChange={(e)=>fileChangeHandler(e)} style={{zIndex:'-1' ,position:'absolute' }}/>
                                                                        <div onClick={()=>imageRef.current.click()} style={{ backgroundColor:'blue',cursor:'pointer', color:'white', display:'flex', justifyContent:'center', alignItems:'center', height:'6vh', width:'15vw', borderRadius:'1rem'}}>
                                                                        <span>Choose from Computer</span>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',marginRight:'5vw', height:'15%', margin:'auto'}}>
                                                            {
                                                                imagePreview ? <button  type="submit" style={{borderRadius:'0.5rem', cursor:'pointer', border:'none',height:'50%', width:'15%', backgroundColor: 'green', opacity: '100%', color:'white'}}>
                                                                    Submit
                                                                </button> : <button style={{borderRadius:'0.5rem', cursor:'pointer', border:'none',height:'50%', width:'15%', backgroundColor:'gray', opacity: '10%',color:'white'}}>
                                                                    Submit
                                                                </button>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                               */ }
                            <div><PhotoCamera sx={{width:22, height:22, color:blue[800]}}/><span style={{position:'relative', top:'-6px'}}>Photo</span></div>
                            <div><Place sx={{width:24, height:24}}/><span style={{position:'relative', top:'-6px'}}>Place</span></div>
                        </div>
                        <div>Send ➡️</div>
                    </div>
                </div>
                <div className='feeds' style={{flex:'1',overflow:'scroll', height:'88vh'}}>
                    <div style={{display:'flex', flexDirection:'column', flex:'1'}}>
                        {
                            [1,2,3,4].map((item, index)=>{
                                return(
                                    <div key={index} className='feedcontainer'>
                                        <div style={{display:'flex', justifyContent:'space-between', padding:'0.8rem 1rem 0.5rem 2rem' , fontWeight:'bold'}}>
                                            <div style={{display:'flex'}}>
                                                <div><Avatar alt="Sudhir Kumar" src="/broken-image.jpg" sx={{width:40, height:40, bgcolor:deepOrange[400]}}/></div>
                                                <div style={{paddingTop:'0.2rem', paddingLeft:'1rem'}}>George Lobko</div>
                                            </div>
                                            <div>:</div>
                                        </div>
                                        <div className='caption'>Hi everyone, today I was on the most beautiful mountain in the world 😍, I also want to say hi to 👰‍♀️ Salina !</div>
                                        <div className='card'></div>
                                        <div style={{display:'flex',paddingLeft:'2rem', paddingRight:'1rem',marginTop:'0.5rem', marginBottom:'0.5rem', gap:'2.5vw'}}>
                                            {
                                                liked? <div style={{cursor:'pointer'}}><Favorite sx={{width:25, height:25, color:red[800]}}/><span style={{position:'relative', top:'-6px'}}>{liked.length} Likes </span></div> : <div style={{cursor:'pointer'}}> <FavoriteBorder sx={{width:25, height:25}}/> <span style={{position:'relative', top:'-6px'}}>Likes</span></div>
                                            }
                                            {
                                                comments? <div style={{cursor:'pointer'}}><Textsms sx={{width:24, height:24, color:blue[800]}}/><span style={{position:'relative', top:'-6px'}}>{comments.length} Comments </span></div> : <div style={{cursor:'pointer'}}><TextsmsOutlined sx={{width:24, height:24}}/><span style={{position:'relative', top:'-6px'}}>{comments.length} Comments </span></div>
                                            }
                                            
                                                <div style={{cursor:'pointer'}}> Say nice👌</div>
                                                <hr/>
                                            {
                                                Bookmarks? <div style={{cursor:'pointer'}}><Bookmark sx={{width:25, height:25, color:green[800]}}/> <span style={{position:'relative', top:'-6px'}}>Bookmarked </span></div> : <div style={{cursor:'pointer'}}> <BookmarkBorder/>Bookmark</div>
                                            }
                                        </div>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <div style={{display:'flex',height:'1.5rem', width:'35vw', border:'1px solid black', marginLeft:'1vw', paddingLeft:'1vw', borderRadius:'0.5rem', alignItems:'center'}}>
                                                <input placeholder='comment this post ...✍️' style={{border:'none',outline:'none' ,paddingLeft:'0.5vw',height:'1hv', width:'34vw'}} /> 
                                            </div>
                                            <Send sx={{width:28, height:28, color:blue[800]}}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            
        </>
    );
}
export default Feed;