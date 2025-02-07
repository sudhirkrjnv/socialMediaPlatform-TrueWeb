import { Avatar } from '@mui/material';
import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setPosts} from '../../../../redux/postSlice.js'
import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

function CommentDialog() {
    
    const [commented_text, setCommented_text] = useState("");

    const {selectedPost} = useSelector(store=>store.post);

    const [comment, setComment] = useState([]);

    const {posts} = useSelector(store=>store.post);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(selectedPost) setComment(selectedPost.comments);
    }, [selectedPost]);

    const commentHandler = async()=>{
        try {
            const res =  await axios.post(`http://localhost:8000/api/v1/post/${selectedPost?._id}/addcomment`, {commented_text}, {
                headers:{
                  'Content-Type':'application/json'
                },
                withCredentials:true
            })
            
            if(res.data.success){
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);
                
                const updatedPostData = posts.map(p=>
                    p._id === selectedPost._id ?
                    {...p, comments:updatedCommentData} : p
                );
                
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setCommented_text("");
                
            } 
        } catch (error) {
            toast.error(error.response?.data.messege);
        }
    }
    return (
        <>    
            <div style={{display:'flex',borderBottom:'1px solid #eee', padding:'1px' ,flexDirection:'column', alignItems:'center', justifyContent:'center',height:'5%', margin:'auto'}}>
                <b>Comments of this Post</b>           
            </div>
            <div style={{display:'flex', flexGrow:'1', gap:'5px'}}>
                <div style={{width:'40vw', height:'48vh', backgroundColor:'#eee', marginTop:'0.5vh', borderRadius:'5px'}}>
                    <img src={selectedPost?.image} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius:'5px'}} />
                </div>
                <div style={{width:'30vw', height:'48vh', marginTop:'0.5vh', borderRadius:'5px', border:'1px solid #ccc'}}>
                    {/* All Comments of This Post */}
                    <div className='scrolldisable' style={{height:'42vh', overflow:'scroll'}}>
                        {
                            comment.map((cmt)=>
                                <div key={cmt._id} style={{display:'flex', flexDirection:'column', gapY:'1rem'}}>
                                    <div style={{display:'flex', justifyContent:'flex-start', color:'blue', marginTop:'5px', marginLeft:'5px', alignItems:'center'}}>
                                        <div>
                                            <Avatar alt="autar" src={cmt?.author?.profilePicture} sx={{width:40, height:40, bgcolor:'#eee'}}/>
                                        </div>
                                        <div style={{backgroundColor:'#eee', minHeight:'1rem', maxWidth:'85%', padding:'0.2rem 0.2rem 0.2rem 0.2rem', borderRadius:'0.5rem', fontFamily:'cursive', fontSize:'small'}}>
                                            <b>{cmt?.commented_text}</b>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/* Text Input and Send Button */}
                    <div style={{margin:'10px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', margin:'0 1vw 0 1vw'}}>
                            <input type='text' value={commented_text} onChange={(e) => setCommented_text(e.target.value.trim() ? e.target.value : "")} placeholder='Comment this Post ... ' style={{borderRadius:'5px', outlineColor:'#ddd',border:'#ddd', width:'80%', padding:'8px', backgroundColor:'#eee'}}/>
                            {
                                commented_text && 
                                    <button onClick={commentHandler} disabled={!commented_text.trim()} style={{color:'darkBlue', border:'none'}}><b>SEND</b></button>
                            }
                        </div>
                    </div>
                </div>
            </div>                     
        </>
    )
}

export default CommentDialog