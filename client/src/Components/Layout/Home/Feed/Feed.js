import Avatar from '@mui/material/Avatar';
import { deepOrange, red, green , blue} from '@mui/material/colors';
import {FavoriteBorder, Favorite, BookmarkBorder, Bookmark, TextsmsOutlined,Textsms, Send, Folder, PhotoCamera, Place, MoreVert} from '@mui/icons-material';
import { useRef, useState } from 'react';
import Dialog from '../../../../utils/dialogUtils';
import axios from 'axios';
import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import useGetAllPost from '../../../../Hooks/useGetAllPosts';
import { useSelector } from 'react-redux';

function Feed(){
    
    
    const [open, setOpen] = useState(false);
    const imageRef = useRef();
    
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    
    useGetAllPost();

    const {posts} = useSelector(store=>store.post)


    const fileChangeHandler = (e)=>{
        const file = e.target.files?.[0];
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

    const inputTextHandler = (e)=>{
        const inputText = e.target.value;
        if(inputText.trim()){
            setText(inputText);
        } else setText("");
    }

    const createPostHandler = async(e)=>{
        const formData = new FormData();
        formData.append("caption", caption);
        if(imagePreview) formData.append("image", file);
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, 
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }, 
                    withCredentials:true
                }
            );
            if (res.data.success){
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data.message || "something went worng");
        } finally{
            setLoading(false);
        }
      
    }

    const Bookmarks =[
        {userId:'01', name:"Anjali Kumari"}
    ]

    return(
        <>
            <div style={{paddingLeft:'2rem'}}>

                {/*   ADD POST SECTION     */}
                <div className='addpostbutton' style={{width:'43vw', height:'10vh', backgroundColor:'#fff', marginLeft:'4.5rem', marginTop:'0.2rem', marginBottom:'0.5rem', borderRadius:'1.2rem', boxShadow:'0 4px 6px rgba(0,0,0,0.1)', display:'flex', flexDirection:'column', justifyContent:'center'}}>
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
                                                <textarea type='text' placeholder="About your Post" value={caption} onChange={(e)=>setCaption(e.target.value)} style={{width:'100%', border:'none', outline:'none', paddingLeft:'10px', paddingRight:'10px'}} />    
                                            </div>
                                            <div style={{display:'flex', alignItems:'center', height:'60%', width:'85%', justifyContent:'center', backgroundColor:'rgb(189,189,189)', margin:'auto',marginTop:'5px', border:'1px solid black', borderRadius:'1rem'}}>
                                                {/*        Post Image        */}
                                                {
                                                    imagePreview ? <img src={imagePreview} alt="post.image" style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:'1rem'}}/> 
                                                        : 
                                                        <div>
                                                            <input ref={imageRef} type='file' onChange={(e)=>fileChangeHandler(e)} style={{zIndex:'-1' ,position:'absolute' }}/>
                                                            <div onClick={()=>imageRef.current.click()} style={{ backgroundColor:'blue',cursor:'pointer', color:'white', display:'flex', justifyContent:'center', alignItems:'center', height:'6vh', width:'15vw', borderRadius:'1rem'}}>
                                                                <span>Choose from Computer</span>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                            { /* Submit Section */}
                                            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',marginRight:'5vw', height:'15%', margin:'auto'}}>
                                                {
                                                    imagePreview ? (loading ? <button  type="submit" onClick={(e)=>createPostHandler(e)} style={{borderRadius:'0.5rem', cursor:'pointer', border:'none',height:'50%', width:'20%', backgroundColor: 'green', opacity: '100%', color:'white', display:'flex', alignItems:'center', justifyContent:'center', gap:'1vw'}}>
                                                        Please wait <CircularProgress size={18}  style={{color:'#fff'}}/></button> : 
                                                    <button  type="submit" onClick={(e)=>createPostHandler(e)} style={{borderRadius:'0.5rem', cursor:'pointer', border:'none',height:'50%', width:'15%', backgroundColor: 'green', opacity: '100%', color:'white'}}>
                                                        Submit
                                                    </button>) : <button style={{borderRadius:'0.5rem', cursor:'pointer', border:'none',height:'50%', width:'15%', backgroundColor:'gray', opacity: '10%',color:'white'}}>
                                                        Submit
                                                    </button>
                                                }
                                                                
                                            </div>
                                        </>
                                    </Dialog>
                            }
                            <div><PhotoCamera sx={{width:22, height:22, color:blue[800]}}/><span style={{position:'relative', top:'-6px'}}>Photo</span></div>
                            <div><Place sx={{width:24, height:24}}/><span style={{position:'relative', top:'-6px'}}>Place</span></div>
                        </div>
                        <div>Send ➡️</div>
                    </div>
                </div>

                { /*            POST SECTION                  */}

                <div className='scrolldisable' style={{flex:'1',overflow:'scroll', height:'88vh'}}>
                    <div style={{display:'flex', flexDirection:'column', flex:'1'}}>
                        {
                            posts.map((post)=>{
                                return(
                                    <div key={post._id} style={{backgroundColor:'white', height:'78vh', width:'43vw', marginBottom:'1rem', marginLeft:'4.5rem', borderRadius:'1.2rem', boxShadow:'0px 4px 6px #ccc'}}>
                                        <div style={{display:'flex', justifyContent:'space-between', padding:'0.8rem 1rem 0.5rem 2rem' , fontWeight:'bold'}}>
                                            {/*     Avatar Section    */}
                                            <div style={{display:'flex', cursor:'pointer'}}>
                                                <div><Avatar alt="Sudhir Kumar" src={post?.author?.profilePicture} sx={{width:40, height:40, bgcolor:deepOrange[400]}}/></div>
                                                <div>
                                                    <div style={{paddingTop:'0.1rem', paddingLeft:'1rem'}}>{post?.author?.name}</div>
                                                    <div style={{paddingLeft:'1rem', fontWeight:'lighter', color:'#666', fontSize:'small'}}>{post?.author?.bio}</div>
                                                </div>
                                            </div>
                                            <div style={{cursor:'pointer'}}><MoreVert/></div>
                                        </div>
                                        {/*      Captions     */}
                                        <div style={{paddingLeft:'1rem'}}>
                                            <textarea type='text' value={post?.caption || ""}  readOnly='true' style={{cursor:'pointer',border:'none', outline:'none', width:'95%',fontFamily:'Segoe UI', lineHeight:'1.2rem', wordSpacing:'0.4rem', display:'flex', alignItems:'center'}}/>
                                        </div>
                                        {/*     Post Image    */}
                                        <div style={{margin:'auto', width:'98%', height:'65%', border:'1px solid #666', borderRadius:'1rem', backgroundColor:'#eee', overflow:'hidden'}}>
                                            <img src={post?.image} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                        </div>
                                        <div style={{display:'flex',paddingLeft:'2rem', paddingRight:'1rem',marginTop:'0.5rem', marginBottom:'0.5rem', gap:'2.5vw'}}>
                                            {
                                                (post?.likes)? (<div style={{cursor:'pointer'}}><Favorite sx={{width:25, height:25, color:red[800]}}/><span style={{position:'relative', bottom:'8px'}}>&nbsp;{post?.likes?.length} Likes </span></div>) : (<div style={{cursor:'pointer'}}><FavoriteBorder sx={{width:25, height:25}}/> <span style={{position:'relative', top:'-6px'}}> &nbsp;0 Likes</span></div>)
                                            }
                                            {
                                                (post?.Comments)? (<div style={{cursor:'pointer'}}><Textsms sx={{width:24, height:24, color:blue[800]}}/><span style={{position:'relative', bottom:'8px'}}>&nbsp;{post?.omments?.length} Comments </span></div>) : (<div style={{cursor:'pointer'}}><TextsmsOutlined sx={{width:24, height:24}}/><span style={{position:'relative', top:'-6px'}}>&nbsp;0 Comments </span></div>)
                                            }                                          
                                            <div style={{cursor:'pointer'}}> Say nice👌</div>
                                            <hr/>
                                            {
                                                Bookmarks? <div style={{cursor:'pointer'}}><Bookmark sx={{width:25, height:25, color:green[800]}}/> <span style={{position:'relative', top:'-6px'}}>Bookmarked </span></div> : <div style={{cursor:'pointer'}}> <BookmarkBorder/>Bookmark</div>
                                            }
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'1vw'}}>
                                            <div style={{display:'flex',height:'2rem', width:'85%', borderRadius:'0.5rem', alignItems:'center'}}>
                                                <textarea type='text' value={text} onChange={inputTextHandler} placeholder='comment this post ...✍️' className='scrolldisable' style={{cursor:'pointer', border:'none',outline:'none', padding:'10px',height:'100%', width:'100%', display:'flex', alignItems:'center'}} /> 
                                            </div>
                                            {
                                                text && <div style={{color:'darkBlue'}}><b>Send</b></div>
                                            }
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