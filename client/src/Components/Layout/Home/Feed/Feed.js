import './Feed.css';

import { Avatar } from '@mui/material';
function Feed(){
    return(
        <>
            <div style={{paddingLeft:'2rem'}}>
                <div className='addpostbutton'>
                    <div style={{display:'flex', alignItems:'center', width:'37rem',height:'2.5rem', borderRadius:'1.25rem',backgroundColor:'white', marginLeft:'2rem', border:'0.5px solid #BDBDBD'}}>
                        <div style={{width:'2.5rem', height:'2.5rem',borderRadius:'1.25rem', background:'black'}}><Avatar/></div>
                        <input style={{paddingLeft:'1rem', paddingRight:'1rem', width:'32vw', border:'none', outline:'none'}} type='text' placeholder='share something'/>
                        <div>😊</div>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'3rem', paddingRight:'1.5rem'}}>
                        <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 📁File &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 📷Image  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔘Location
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
                                                <div className='AvatarCircle'><Avatar/></div>
                                                <div style={{paddingTop:'0.2rem', paddingLeft:'1rem'}}>George Lobko</div>
                                            </div>
                                            <div>:</div>
                                        </div>
                                        <div className='caption'>Hi everyone, today I was on the most beautiful mountain in the world 😍, I also want to say hi to 👰‍♀️ Salina !</div>
                                        <div className='card'></div>
                                        <div style={{display:'flex', paddingLeft:'2rem', paddingRight:'1rem',marginTop:'-0.8rem'}}>
                                            <h5> ❤️ Likes</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <h5> 💬 Comments</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <h5> 🔖Save</h5><hr/>
                                            <h5> Say nice👌 &nbsp;&nbsp; ➡️ </h5>
                                        </div>
                                        <div>
                                            <input placeholder='comment this post ...✍️' style={{height:'1.5rem', width:'25rem', border:'1px solid black', marginLeft:'1rem', marginRight:'1rem', borderRadius:'0.5rem'}}/> Send
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