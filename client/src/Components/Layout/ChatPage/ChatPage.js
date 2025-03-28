import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChatType, setSelectedChatData, setRecentChatList, setSelectedChatMessages,updateRecentChatList } from '../../../redux/chatSlice.js';
import './ChatPage.css';
import { Avatar } from '@mui/material';
import {AddCommentOutlined, MoreVertOutlined, FiberManualRecord} from '@mui/icons-material';
import axios from 'axios';
import MessagesContainer from './MessagesContainer/MessagesContainer';
import { Popover } from 'react-tiny-popover';
import Dialog from '../../../utils/dialogUtils.js';
import ContactSearch from './ContactSearch.js';

function ChatPage({isGroup=false}) {
    const dispatch = useDispatch();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [privateChatOpen, setPrivateChatOpen] = useState(false);

    const {recentChatList, selectedChatData} = useSelector(store => store.chat);
    const { userStatus } = useSelector((store) => store.socket);
    const { user } = useSelector((store) => store.auth);
    const { socket } = useSelector((store) => store.socket);

    useEffect(() => {
        const fetchRecentChats = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/message/recentUsersList', {
                    withCredentials: true
                });
                dispatch(setRecentChatList(res.data.list));
            } catch (error) {
                console.error("Error fetching recent chats:", error);
            }
        };
        
        fetchRecentChats();
    }, [dispatch]);

    useEffect(() => {
        if (!socket || !user) return;
    
        const handleUpdateRecentChat = (message) => {
            dispatch(updateRecentChatList({
                message,
                currentUserId: user._id
            }));
        };
    
        socket.on('receiveMessage', handleUpdateRecentChat);
        socket.on('sendMessage', handleUpdateRecentChat);
    
        return () => {
            socket.off('receiveMessage', handleUpdateRecentChat);
            socket.off('sendMessage', handleUpdateRecentChat);
        };
    }, [socket, user, dispatch]);

    const handleSelectedItem = (item) => {
        if(isGroup){
            dispatch(setSelectedChatType("Group"));
        } else {
            dispatch(setSelectedChatType("OneToOne"));
            dispatch(setSelectedChatData(item));
        }
        if(selectedChatData && selectedChatData._id !== item._id){
            dispatch(setSelectedChatMessages([]));
        }
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '95vh', width: '30vw', marginTop: '2vh' }}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight:'18px', paddingLeft:'15px'}}>
                        <h2>Chats</h2>
                        <div style={{display:'flex'}}>
                            <Popover isOpen={isPopoverOpen} positions={['left']} 
                                content={
                                    <div style={{padding:'5px',borderRadius:'10px', display:'flex', gap:'10px'}}>
                                        <button onClick={()=>{setPrivateChatOpen(true)}} style={{cursor:'pointer', backgroundColor:'white', padding:"10px", border:'1px solid #ccc', borderRadius:'8px'}}>Private Chat</button>
                                        <button style={{backgroundColor:'white', padding:"10px", border:'1px solid #ccc', borderRadius:'8px'}}>Group Chat</button>
                                    </div>
                                }>
                                <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                                    <AddCommentOutlined style={{transform:'rotate(90deg) rotateY(180deg)' }}/>
                                </div>
                            </Popover>
                            <MoreVertOutlined/>
                            <Dialog open={privateChatOpen} onClose={() => setPrivateChatOpen(false)} overlayStyles={{display:'flex', justifyContent:'center'}} dialogStyles={{padding: '1rem', top:'20vh', width:'25vw', height:'35vh' }}>
                                <ContactSearch onClose={() => setPrivateChatOpen(false)} />
                            </Dialog>
                        </div>
                    </div>
                    <div>
                        <input type='search' placeholder='Select Contacts or group from recent chat list' style={{ margin: '1vh 1vw', width: '28vw', borderRadius: '0.5rem', padding: '5px' }} />
                    </div>
                    <div className='Profiles' style={{ overflowY: 'scroll', scrollBehavior: 'smooth', height: '86vh', width: '28vw' }}>
                        <h4 style={{ marginLeft: '1vw', marginTop: '2vh' }}>Recent Chats</h4>
                        {
                            recentChatList?.length > 0
                            ? (
                                recentChatList.map((chat) => (
                                    <div onClick={() => handleSelectedItem(chat)} key={chat._id} style={{ backgroundColor: selectedChatData && selectedChatData._id === chat._id ? "rgb(223, 229, 237)" : "#F0F2F5" ,display: 'flex', marginTop: '1vh', marginLeft: '1vw', cursor: 'pointer', padding:'10px', borderRadius:'10px' }}>
                                        {
                                            !isGroup && <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', height:'100%', width:'100%'}}>
                                                <div style={{display:'flex', alignItems:'center'}}>
                                                    <Avatar src={chat.profilePicture} />
                                                    <div style={{ paddingLeft: '0.5rem' }}>
                                                        <div><strong>{chat.name}</strong></div>
                                                        <div style={{ color: '#1f1f1f', fontSize: '12px' }}>@{chat.username}</div>
                                                    </div>
                                                </div>
                                                <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                                    <div style={{ fontSize: '10px', color: 'gray' }}>Last Message: {new Date(chat.lastMessageTime).toLocaleTimeString()}</div> 
                                                    <FiberManualRecord fontSize='sx' style={{ color: userStatus[chat._id] === 'active' ? 'green' : 'red' }} />
                                                </div>
                                            </div>
                                        }
                                        {
                                            isGroup && <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', height:'100%', width:'100%'}}>
                                                <div style={{display:'flex', alignItems:'center'}}>
                                                    <Avatar/>
                                                    <div style={{ paddingLeft: '0.5rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                                                        <div><strong>Group 1</strong></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '10px', color: 'gray' }}>Last Message: {new Date(chat.lastMessageTime).toLocaleTimeString()}</div> 
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                            ) 
                            : (
                                <div style={{ height: '40vh', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontWeight: 'bolder' }}>
                                    <div>Recents Chat is Empty</div>
                                </div>
                            )   
                        }
                    </div>
                </div>
                <MessagesContainer />
            </div>
        </>
    );
}

export default ChatPage;