import { useRef, useState , useEffect} from 'react';
import './ChatPage.css';
import {Attachment, SentimentSatisfiedAlt} from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import { Avatar, Button } from '@mui/material';
import Messages from './Message/Messages';

function ChatPage(){

    let suggestedUsers = [
        {username : "Sudhir Kumar"},
        {username : "Ritesh Kumar"},
        {username : "Prem Prakash"},
        {username : "Rajeev Kumar"},
        {username : "Gyanchand Kumar"},
        {username : "Rahul Kumar"},
        {username : "Satish Kumar"},
        {username : "Angraj"},
        {username : "Kaushal Kumar"},
        {username : "Avinash Kumar"},
        {username : "Roshan"},
        {username : "Himanshu"},
        {username : "Kundan Kumar"},
        {username : "JayVardhan"},
        {username : "Ujjawal Kumar"}
    ]

    const [selectedUser, setSelectedUser] = useState(null);
    const [messageText, setMessageText] = useState('');

    const emojiPickerRef = useRef();

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const toggleEmojiPicker = () => {
        setEmojiPickerOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setEmojiPickerOpen(false);
            }
        };

        if (emojiPickerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emojiPickerOpen]);
    
    const onEmojiClick = (emoji) => {
        setMessageText((prevMessageText) => prevMessageText + emoji.emoji);
    };
    
    return(
        <>
            <div style={{display:'flex'}}>
                <div style={{height:'95vh', width:'30vw', marginTop:'2vh'}}><b>Chat with connection here : </b>
                    <div><input type='search' placeholder='&nbsp;&nbsp;&nbsp;🔎&nbsp;&nbsp;&nbsp;&nbsp; Search for Family, Friends and Collegue ...' style={{margin:'1vh 1vw 1vh 1vw', width:'26vw', borderRadius:'0.5rem', padding:'5px '}}></input></div>
                    <div className='Profiles' style={{overflowY:'scroll',scrollBehavior:'smooth' ,height:'86vh', width:'28vw'}}>
                        {
                            suggestedUsers.map((user)=>{
                                return(
                                    <div onClick={()=>setSelectedUser(user)} key={user.username} style={{display:'flex', marginTop:'1vh', marginLeft:'1vw'}}>
                                        <div className='Avatar'><Avatar/></div>
                                        <div style={{paddingTop:'0.5rem', paddingLeft:'0.5rem'}}>{user.username}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div style={{border:'1px solid black', height:'95vh', width:'45vw', marginTop:'2vh'}}>
                {
                    selectedUser? (
                            <div style={{ marginTop:'1vh', marginLeft:'1vw', height:'100%', width:'100%', overflow:'hidden'}} >
                                <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', height:'20%', marginBottom:'5vh'}}>
                                    <div className='Avatar'><Avatar/></div>
                                    <div style={{paddingTop:'0.5rem', paddingLeft:'0.5rem'}}><b>{selectedUser?.username}</b></div>
                                </div>
                                <div style={{width:'95%', height:'65%'}}>
                                    <Messages selectedUser = {selectedUser}/>
                                </div>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <div style={{width:'88%', height:'5vh', border:'1px solid pink', marginTop:'1vh', borderRadius:'0.4rem', display:'flex', alignItems:'center', overflow:'hidden'}}>
                                        <input type='text' value={messageText} onChange={(e) => setMessageText(e.target.value.trim() ?  e.target.value : "")}  placeholder='send messages' style={{width:'88%', height:'5vh', fontFamily:"monospace", fontWeight:'bold',fontSize:'15px', outline:'none', border:'none', marginLeft:'10px', backgroundColor:'inherit'}}/>
                                        <Attachment style={{marginTop:'5px', marginRight:'10px', transform:'rotate(135deg)'}}/>
                                        <SentimentSatisfiedAlt  onClick={toggleEmojiPicker} style={{marginTop:'5px', marginRight:'10px'}}/>
                                    </div>
                                    <Button disabled={!messageText.trim()}> Send </Button> 
                                    
                                </div>
                                {
                                    emojiPickerOpen && 
                                        <div ref={emojiPickerRef} style={{position:'relative', display:'inline-block', bottom:'65vh', left:'20vw', overflow:'hidden'}}>
                                            <EmojiPicker onEmojiClick={onEmojiClick} previewConfig={{ showPreview: false }}/>
                                        </div>
                                }
                            </div>
                    ) : (
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}> <b>Send a Message to Start a Chat</b></div>
                    )
                }
                </div>
            </div>
        </>
    );
}
export default ChatPage;