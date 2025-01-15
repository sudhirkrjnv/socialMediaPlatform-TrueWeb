import './Rightsidebar.css';
import { Avatar } from '@mui/material';
function RightSidebar(){
    return(
        <>
            <div>
                <div style={{marginLeft:'2rem',marginTop:'1rem', height:'10rem', width:'25rem'}}><h2>Stories</h2>
                    <div className='storiescontainer' style={{display:'flex',flexDirection:'row', alignItems:'center',gap:'0.5rem', height:'6rem', width:'24rem', marginBottom:'0.5rem', overflowX:'auto', scrollBehavior:'smooth'}}>
                        {
                            [1,2,3,4,5,6,7].map((item,index)=>{
                                return(
                                    <div style={{width:'5rem', height:'5rem', borderRadius:'2.5rem', border:'1px solid black',flexShrink:'0'}}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{marginTop:'2rem', marginLeft:'2rem', width:'20vw'}}><h2>Suggestions</h2><hr/>
                        {
                            [1,2,3,4,5].map((item, index)=>{
                                return(
                                    <div key={index} style={{marginTop:'0.2rem', display:'flex'}}>
                                        <div style={{backgroundColor:'gray', border:'1px solid black', height:'2.5rem', width:'2.5rem', borderRadius:'1.25rem'}}><Avatar/></div>
                                        <div style={{marginLeft:'1rem',fontWeight:'bold', fontSize:'1.2rem', paddingTop:'0.2rem', opacity:'75%'}}>Sudhir Kumar</div>
                                    </div>
                                )
                            })
                        }
                </div>
                <div style={{marginLeft:'2rem'}}><h2>Shorts</h2>
                    <div className='shortscontainer' style={{display:'flex', alignItems:'center',paddingLeft:'0.5rem', flexDirection:'row',height:'10rem', width:'24rem', overflowX:'auto', scrollBehavior:'smooth', gap:'0.5rem'}}>
                        {
                            [1,2,3,4].map((item,index)=>{
                                return(
                                    <div style={{width:'6rem', height:'9rem', borderRadius:'0.5rem', border:'1px solid black', gap:'0.5rem', flexShrink:'0'}}/>
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