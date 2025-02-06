import React from 'react'
import Avatar from '@mui/material/Avatar';
import { deepOrange, red, green , blue} from '@mui/material/colors';
import {FavoriteBorder, Favorite, BookmarkBorder, Bookmark, TextsmsOutlined,Textsms,MoreVert} from '@mui/icons-material';
import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../../../../redux/postSlice';

function Post({post}) {

    
    const {user} = useSelector(store=>store.auth);
    const {posts} = useSelector(store=>store.post);
    
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [likeCount, setLikeCount] = useState(post.likes.length);

    const dispatch = useDispatch();
    
    const [commented_text, setCommented_text] = useState("");
    const [comment, setComment] = useState(post.comments);



    const likeOrDislikeHandler = async()=>{
        try {
            const action = liked? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, {withCredentials:true});
            
            if(res.data.success){
                const updatedLikeCount = liked? likeCount-1 : likeCount+1;
                setLikeCount(updatedLikeCount); 
                setLiked(!liked);

                //updating post like and dislike data in store
                const updatedPostData = posts.map((p) =>
                    p._id === post._id
                        ? {
                            ...p,
                            likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                        }
                        : p
                );
                
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data.messege);
        }
    }
    
    const commentHandler = async()=>{
        try {
            const res =  await axios.post(`http://localhost:8000/api/v1/post/${post._id}/addcomment`, {commented_text}, {
                headers:{
                  'Content-Type':'application/json'
                },
                withCredentials:true
            })
            
            if(res.data.success){
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);
                
                const updatedPostData = posts.map(p=>
                    p._id === post._id ?
                    {...p, comments:updatedCommentData} : p
                );
                
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setCommented_text("");
                
            }

        } catch (error) {
            toast.error(error.response?.data.messege);
            console.log(error);
        }
    }

    const inputTextHandler = (e)=>{
        const inputText = e.target.value;
        if(inputText.trim()){
            setCommented_text(inputText);
        } else setCommented_text("");
    }

    const Bookmarks =[
        {userId:'01', name:"Anjali Kumari"}
    ]

    return (
        <>
            <div style={{display:'flex', flexDirection:'column', flex:'1'}}>          
                <div style={{backgroundColor:'white', height:'78vh', width:'43vw', marginBottom:'1rem', marginLeft:'4.5rem', borderRadius:'1.2rem', boxShadow:'0px 4px 6px #ccc'}}>
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
                            liked ? <div style={{cursor:'pointer'}}><Favorite onClick={likeOrDislikeHandler} sx={{width:25, height:25, color:red[800]}}/><span style={{position:'relative', bottom:'8px'}}> {likeCount} Likes </span></div> : <div style={{cursor:'pointer'}}><FavoriteBorder onClick={likeOrDislikeHandler} sx={{width:25, height:25}}/> <span style={{position:'relative', bottom:'8px'}}> {likeCount} Likes </span></div>
                            
                        }
                        
                        <div style={{cursor:'pointer',display:'flex', gap:'5px'}}><TextsmsOutlined sx={{width:24, height:24}} style={{position:'relative', top:'2px'}}/><span style={{position:'relative', top:'1px'}}>{comment.length} Comments </span></div>
                                                                 
                        <hr/>
                        {
                            Bookmarks? <div style={{cursor:'pointer'}}><Bookmark sx={{width:25, height:25, color:green[800]}}/> <span style={{position:'relative', top:'-6px'}}>Bookmarked </span></div> : <div style={{cursor:'pointer'}}> <BookmarkBorder/>Bookmark</div>
                        }
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'1vw'}}>
                        <div style={{display:'flex',height:'2rem', width:'85%', borderRadius:'0.5rem', alignItems:'center'}}>
                            <input type='text' value={commented_text} onChange={inputTextHandler} placeholder='comment this post ...✍️' className='scrolldisable' style={{border:'none',outline:'none', padding:'10px',height:'100%', width:'100%', display:'flex', alignItems:'center'}} /> 
                        </div>
                        {
                            commented_text && <div onClick={commentHandler} style={{color:'darkBlue', cursor:'pointer'}}><b>Send</b></div>
                        }
                    </div>
                </div>                         
            </div>
        </>
    )
}

export default Post;
