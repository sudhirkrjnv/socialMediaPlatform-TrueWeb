import React from 'react'
import Avatar from '@mui/material/Avatar';
import { deepOrange, red, green , blue} from '@mui/material/colors';
import {FavoriteBorder, Favorite, BookmarkBorder, Bookmark, TextsmsOutlined,Textsms,MoreVert} from '@mui/icons-material';
import { useState } from 'react';

export default function Post({post}) {

    const [text, setText] = useState("");

    const inputTextHandler = (e)=>{
        const inputText = e.target.value;
        if(inputText.trim()){
            setText(inputText);
        } else setText("");
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
            </div>
        </>
    )
}
