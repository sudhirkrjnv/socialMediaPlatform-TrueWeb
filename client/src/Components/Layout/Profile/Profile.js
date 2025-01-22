import { useRef, useState } from 'react';
function Profile(){

    const profilePicRef = useRef();
    const [image, setImage] = useState("");

    const profilePicHandler = (e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImage(reader.result);
                }
            }
        }
    }

    return(
        <>
            <div style={{backgroundColor:'red', height:'100vh', width:'80vw'}}>
                <div style={{display:'flex', gap:'1vw', height:'50%', width:'100%', margin:'auto'}}>
                    <div style={{height:'50vh', width:'30vw', border:'1px solid black',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1vh'}}>
                        <div style={{backgroundColor:'yellow', height:'20vw', borderRadius: '50%', width:'20vw', borderRadius:'20vh', display:'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                            {
                                image && (

                                    <img src={image} alt="profilePic" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius:'1rem' }}/>
                                )
                            }
                        </div>
                        <input type='file' ref={profilePicRef} onChange={(e)=>profilePicHandler(e)} style={{display:'none'}}/>
                        <button onClick={()=>profilePicRef.current.click()}>Change Picture</button>
                    </div>
                    <div style={{height:'50vh', width:'50vw', backgroundColor:'green'}}>
                        <div>
                            <h1>Sudhir Kumar</h1>
                        </div>
                            <h5>USERID : 122502</h5>
                        </div>
                </div>
                <div></div>
            </div>
        </>
    );
}
export default Profile;