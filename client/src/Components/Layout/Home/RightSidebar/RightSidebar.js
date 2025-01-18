import './Rightsidebar.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
function RightSidebar(){

    const Suggestions = [
        {userId:'01', name: "Ritesh Panday"},
        {userId:'02', name: "Prem Prakash"},
        {userId:'03', name: "Rajeev Kumar"},
        {userId:'04', name: "Gitanjali Kumari"},
        {userId:'05', name: "Anjali Kumari"},
        {userId:'06', name: "Amrita Kumari"},
        {userId:'07', name: "Priyanka Kumari"},
        {userId:'08', name: "Amrita Kumari"},
        {userId:'09', name: "Priyanka Kumari"}
    ]
    const stories = [
        {userId:'01', name: "Sudhir Kumar", video_uri:''},
        {userId:'02', name: "Ritesh Panday", video_uri:''},
        {userId:'03', name: "Prem Prakash", video_uri:''},
        {userId:'04', name: "Rajeev Kumar", video_uri:''},
        {userId:'05', name: "Gitanjali Kumari", video_uri:''},
        {userId:'06', name: "Anjali Kumari", video_uri:''},
        {userId:'07', name: "Amrita Kumari", video_uri:''},
        {userId:'08', name: "Priyanka Kumari", video_uri:''}
    ]
    const shorts = [
        {userId:'01', name: "Sudhir Kumar", video_uri:''},
        {userId:'02', name: "Ritesh Panday", video_uri:''},
        {userId:'03', name: "Prem Prakash", video_uri:''},
        {userId:'04', name: "Rajeev Kumar", video_uri:''},
        {userId:'05', name: "Gitanjali Kumari", video_uri:''},
        {userId:'06', name: "Anjali Kumari", video_uri:''},
        {userId:'07', name: "Amrita Kumari", video_uri:''},
        {userId:'08', name: "Priyanka Kumari", video_uri:''}
    ]

    return(
        <>
            <div>
                <div style={{marginLeft:'2rem',marginTop:'1rem', height:'10rem', width:'25rem'}}><h2>Stories</h2>
                    <div className='storiescontainer' style={{display:'flex',flexDirection:'row', alignItems:'center',gap:'0.5rem', height:'8rem', width:'24.8rem', marginBottom:'0.5rem', overflowX:'auto', scrollBehavior:'smooth'}}>
                        {
                            stories.map((item,index)=>{
                                return(
                                    <>
                                        <div>
                                            <div key={index} style={{width:'5rem', height:'5rem', borderRadius:'2.5rem', border:'1px solid black',flexShrink:'0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                                <Avatar alt={item.name} src="/broken-image.jpg" sx={{width:80, height:80}}/>
                                            </div>
                                            <span style={{fontFamily:'cursive'}}><center>{item.name}</center></span>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div>
                    <span style={{position:'relative', left:'2vw', top:'3.5vh', fontFamily:'inherit', fontSize:'1.5rem', fontWeight:'700'}}>Suggestions</span>
                    <div className='suggestionsContainer' style={{marginTop:'2rem', marginLeft:'2rem', width:'25vw', height:'35vh', overflow:'scroll'}}>
                        {
                            Suggestions.map((item, index)=>{
                                return(
                                    <div key={index} style={{marginTop:'0.2rem', display:'flex', alignItems:'center'}}>
                                        <div>
                                            <Avatar alt={item.name} src="/broken-image.jpg" sx={{width:35, height:35, bgcolor:deepOrange[400]}}/>
                                        </div>
                                        <div style={{marginLeft:'1vw',fontWeight:'bold', fontSize:'1rem',fontFamily:'monospace' ,paddingTop:'0.2rem', opacity:'100%'}}>{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{marginLeft:'2rem'}}><h2>Shorts</h2>
                    <div className='shortscontainer' style={{display:'flex', alignItems:'center',paddingLeft:'0.5rem', flexDirection:'row',height:'10rem', width:'24rem', overflowX:'auto', scrollBehavior:'smooth', gap:'0.5rem'}}>
                        {
                            shorts.map((item,index)=>{
                                return(
                                    <div key={index} style={{width:'6rem', height:'9rem', borderRadius:'0.5rem', border:'1px solid black', gap:'0.5rem', flexShrink:'0', display:'flex', justifyContent:'center', alignItems:'center', fontFamily:'cursive'}}><center>shorts by <b>{item.name}</b></center></div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default RightSidebar;