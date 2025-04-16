import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChatType, setSelectedChatData, setRecentChatList, setSelectedChatMessages,updateRecentChatList, setGroupList } from '../../../redux/chatSlice.js';
import './ChatPage.css';
import { Avatar } from '@mui/material';
import {AddCommentOutlined, MoreVertOutlined, FiberManualRecord, Group} from '@mui/icons-material';
import axios from 'axios';
import MessagesContainer from './MessagesContainer/MessagesContainer.jsx';
import { Popover } from 'react-tiny-popover';
import Dialog from '../../../utils/dialogUtils.jsx';
import ContactSearch from './ContactSearch.jsx';
import CreateGroup from './CreateGroup.jsx';

function ChatPage() {
    const dispatch = useDispatch();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [privateChatOpen, setPrivateChatOpen] = useState(false);
    const [groupChatOpen, setGroupChatOpen] = useState(false);
    const {recentChatList, selectedChatData, groupList} = useSelector(store => store.chat);
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
        const fetchgroupList = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/user/groups', {
                    withCredentials: true
                });
                dispatch(setGroupList(res.data.groups));
            } catch (error) {
                console.error("Error fetching recent chats:", error);
            }
        }; 
        fetchgroupList();
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

        const isGroupChat = groupList.some(group => group._id === item._id);
        
        if(isGroupChat){
            dispatch(setSelectedChatType("Group"));
        } else {
            dispatch(setSelectedChatType("Individual"));
        }
        
        dispatch(setSelectedChatData(item));
        
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
                                        <button onClick={()=>{setGroupChatOpen(true)}} style={{backgroundColor:'white', padding:"10px", border:'1px solid #ccc', borderRadius:'8px'}}>Group Chat</button>
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
                            <Dialog open={groupChatOpen} onClose={() => setGroupChatOpen(false)} overlayStyles={{display:'flex', justifyContent:'center'}} dialogStyles={{padding: '1rem', top:'20vh', width:'25vw', height:'35vh' }}>
                                <CreateGroup onClose={() => setGroupChatOpen(false)} />
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
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', height:'100%', width:'100%'}}>
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
                                    </div>
                                ))
                            ) 
                            : (
                                <div style={{ height: '40vh', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontWeight: 'bolder' }}>
                                    <div>Recents Chat is Empty</div>
                                </div>
                            )   
                        }
                        {   
                            groupList?.length > 0 &&
                            groupList.map((chat) => (
                                <div onClick={() => handleSelectedItem(chat)} key={chat._id} style={{ backgroundColor: selectedChatData && selectedChatData._id === chat._id ? "rgb(223, 229, 237)" : "#F0F2F5" ,display: 'flex', marginTop: '1vh', marginLeft: '1vw', cursor: 'pointer', padding:'10px', borderRadius:'10px' }}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', height:'100%', width:'100%'}}>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <Avatar alt={chat.name} src="/broken-image.jpg" sx={{width:40, height:40}}><Group/></Avatar>
                                            <div style={{ paddingLeft: '0.5rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                                                <div>{chat.name}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '10px', color: 'gray' }}>Last Message: {new Date(chat.lastMessageTime).toLocaleTimeString()}</div> 
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <MessagesContainer />
            </div>
        </>
    );
}

export default ChatPage;