import React , {useState} from 'react'

function CommentDialog({post}) {

    const [text, setText] = useState("");

    const changeEventHandler = (e)=>{
       const inputText = e.target.value;
       if(inputText.trim()){
        setText(inputText);
       } else setText("")
    }

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
                            (post?.comments)?.map((Comment)=>
                                <div key={Comment._id} style={{display:'flex', flexDirection:'column'}}>
                                    <div>{Comment}</div>
                                </div>
                            )
                        }
                    </div>
                    {/* Text Input and Send Button */}
                    <div style={{margin:'10px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', margin:'0 1vw 0 1vw'}}>
                            <input type='text' value={text} onChange={(e)=>changeEventHandler(e)} placeholder='Comment this Post ... ' style={{borderRadius:'5px', outlineColor:'#ddd',border:'#ddd', width:'80%', padding:'8px', backgroundColor:'#eee'}}/>
                            {
                                text && 
                                    <button disabled={!text.trim()} style={{color:'darkBlue', border:'none'}}><b>SEND</b></button>
                            }
                        </div>
                    </div>
                </div>
            </div>                     
        </>
    )
}

export default CommentDialog