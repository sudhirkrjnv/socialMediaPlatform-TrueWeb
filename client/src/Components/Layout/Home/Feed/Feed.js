import './Feed.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange, red, green , blue, lime} from '@mui/material/colors';
import {FavoriteBorder, Favorite, BookmarkBorder, Bookmark, TextsmsOutlined,Textsms, Send, Folder, PhotoCamera, Place} from '@mui/icons-material';

function Feed(){

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
                            <div><Folder sx={{width:25, height:25, color:blue[800]}}/><span style={{position:'relative', top:'-6px'}}>File</span> </div>
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