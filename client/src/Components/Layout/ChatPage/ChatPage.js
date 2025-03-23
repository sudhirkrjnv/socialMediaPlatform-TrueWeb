import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChatType, setSelectedChatData, setRecentChatList } from '../../../redux/chatSlice.js';
import './ChatPage.css';
import { Avatar } from '@mui/material';
import {AddCommentOutlined, MoreVertOutlined} from '@mui/icons-material';
import axios from 'axios';
import MessagesContainer from './MessagesContainer/MessagesContainer';
import { Popover } from 'react-tiny-popover'
import Dialog from '../../../utils/dialogUtils.js';
import ContactSearch from './ContactSearch.js';


function ChatPage() {

    const dispatch = useDispatch();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [privateChatOpen, setPrivateChatOpen] = useState(false);

    const {recentChatList} = useSelector(store=>store.chat);

    useEffect(() => {
        const fetchRecentChatList = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/message/recentUsersList', { withCredentials: true });
                if (res.status === 200) {
                    dispatch(setRecentChatList(res.data.list));
                }
            } catch (error) {
                console.log("Error fetching chat list:", error);
            }
        };
        fetchRecentChatList();
    }, []);

    const handleSelectedItem = (item) => {
        dispatch(setSelectedChatType("OneToOne"));
        dispatch(setSelectedChatData(item));
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
                                        <button onClick={()=>{setPrivateChatOpen(true)}} style={{cursor:'pointer'}} style={{backgroundColor:'white', padding:"10px", border:'1px solid #ccc', borderRadius:'8px'}}>Private Chat</button>
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
                                    <div onClick={() => handleSelectedItem(chat)} key={chat._id} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw', cursor: 'pointer' }}>
                                        <Avatar src={chat.profilePicture} />
                                        <div style={{ paddingLeft: '0.5rem' }}>
                                            <div><strong>{chat.name}</strong></div>
                                            <div style={{ color: '#1f1f1f', fontSize: '12px' }}>@{chat.username}</div>
                                            <div style={{ fontSize: '10px', color: 'gray' }}>Last Message: {new Date(chat.lastMessageTime).toLocaleTimeString()}</div>
                                        </div>
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