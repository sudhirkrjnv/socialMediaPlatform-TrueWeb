import { useRef, useState , useEffect} from 'react';
import {Attachment, SentimentSatisfiedAlt} from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import { Avatar, Button , Typography} from '@mui/material';
import { deepOrange} from '@mui/material/colors';
import Messages from './Message/Messages.jsx';
import { useSelector} from 'react-redux';

function MessagesContainer() {

    const { user } = useSelector((store) => store.auth);
    const { socket , typingUser} = useSelector((store) => store.socket);
    const {selectedChatType, selectedChatData} = useSelector(store=>store.chat);

    const [message, setMessage] = useState('');

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
        setMessage((prevMessage) => prevMessage + emoji.emoji);
    };

    const handlesendMessage = async()=>{
        if(selectedChatType==="Individual"){
            socket.emit("sendMessage", {
                sender: user._id,
                content: message,
                recipient: selectedChatData._id,
                messageType: "text",
                fileUrl: undefined,
            });
        } else if(selectedChatType === "Group"){
            socket.emit("send_Group_Message", {
                sender: user._id,
                content: message,
                messageType: "text",
                fileUrl: undefined,
                groupId : selectedChatData._id,
            })
        }
        setMessage("");
    }
    
    const handleTyping = ()=>{
        socket.emit ("typing", {
            sender : user._id,
            recipient: selectedChatData?._id,
        });
    }
    
  return (
    <div>
        <div style={{border:'1px solid black', height:'95vh', width:'45vw', marginTop:'2vh'}}>
        {
            selectedChatType === undefined 
            ? 
                (
                    <div>
                        Select User or Group for Chat
                    </div>
                )
            : 
                (
                    <div style={{ marginTop:'1vh', marginLeft:'1vw', height:'100%', width:'100%', overflow:'hidden'}} >

                        {
                            typingUser === selectedChatData?._id && (
                                <p> typing...</p>
                            )
                        }
                        
                        {/*  chat headers for Individual and groups */}
                        {
                            selectedChatType === "Individual" && 
                            <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', height:'20%', marginBottom:'5vh'}}>
                                <Avatar 
                                    src={selectedChatData?.profilePicture} 
                                    sx={{ width: 56, height: 56, bgcolor: deepOrange[400] }} 
                                />
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                    {selectedChatData?.name}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    @{selectedChatData?.username}
                                </Typography>
                            </div>
                        }
                        {
                           selectedChatType === "Group" &&
                           <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', height:'20%', marginBottom:'5vh'}}>
                                <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[400] }}>
                                    {selectedChatData?.name.charAt(0)}
                                </Avatar>
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                    {selectedChatData?.name}
                                </Typography>
                           </div> 
                        }

                        {/* messages displaying */}
                        <div style={{width:'95%', height:'65%'}}>
                            <Messages selectedChatData = {selectedChatData}/>
                        </div>

                        {/* messages sending box and its contents */}
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div style={{width:'88%', height:'5vh', border:'1px solid pink', marginTop:'1vh', borderRadius:'0.4rem', display:'flex', alignItems:'center', overflow:'hidden'}}>
                                <input type='text' value={message} onChange={(e) =>{setMessage(e.target.value.trim() ?  e.target.value : ""); handleTyping() }}  placeholder='send messages' style={{width:'88%', height:'5vh', fontFamily:"monospace", fontWeight:'bold',fontSize:'15px', outline:'none', border:'none', marginLeft:'10px', backgroundColor:'inherit'}}/>
                                <Attachment style={{marginTop:'5px', marginRight:'10px', transform:'rotate(135deg)'}}/>
                                <SentimentSatisfiedAlt  onClick={toggleEmojiPicker} style={{marginTop:'5px', marginRight:'10px'}}/>
                            </div>
                            <Button disabled={!message.trim()} onClick={handlesendMessage}> Send </Button> 
                            
                        </div>
                        {
                            emojiPickerOpen && 
                                <div ref={emojiPickerRef} style={{position:'relative', display:'inline-block', bottom:'65vh', left:'20vw', overflow:'hidden'}}>
                                    <EmojiPicker onEmojiClick={onEmojiClick} previewConfig={{ showPreview: false }}/>
                                </div>
                        }
                    </div>
                )
        }
        </div>
    </div>
  )
}

export default MessagesContainer;
