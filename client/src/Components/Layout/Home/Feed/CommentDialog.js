import { Avatar } from '@mui/material';
import React , {useState} from 'react'
import { useSelector } from 'react-redux';

function CommentDialog({post, commentHandler, commented_text, inputTextHandler}) {
    
    //const [commented_text, setCommented_text] = useState("");

    //const {selectedPost} = useSelector(store=>store.post);

    return (
        <>    
            <div style={{display:'flex',borderBottom:'1px solid #eee', padding:'1px' ,flexDirection:'column', alignItems:'center', justifyContent:'center',height:'5%', margin:'auto'}}>
                <b>Comments of this Post</b>           
            </div>
            <div style={{display:'flex', flexGrow:'1', gap:'5px'}}>
                <div style={{width:'40vw', height:'48vh', backgroundColor:'#eee', marginTop:'0.5vh', borderRadius:'5px'}}>
                    <img src={post?.image} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius:'5px'}} />
                </div>
                <div style={{width:'30vw', height:'48vh', marginTop:'0.5vh', borderRadius:'5px', border:'1px solid #ccc'}}>
                    {/* All Comments of This Post */}
                    <div className='scrolldisable' style={{height:'42vh', overflow:'scroll'}}>
                        {
                            (post?.comments)?.map((cmt)=>
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
                            <input type='text' value={commented_text} onChange={inputTextHandler} placeholder='Comment this Post ... ' style={{borderRadius:'5px', outlineColor:'#ddd',border:'#ddd', width:'80%', padding:'8px', backgroundColor:'#eee'}}/>
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