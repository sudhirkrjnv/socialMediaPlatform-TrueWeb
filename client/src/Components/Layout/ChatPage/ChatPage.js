import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedChatType, setSelectedChatData } from '../../../redux/chatSlice.js';
import './ChatPage.css';
import { Avatar } from '@mui/material';
import axios from 'axios';
import MessagesContainer from './MessagesContainer/MessagesContainer';
import useGetRecentChatList from '../../../Hooks/useGetRecentChatList.js';


function ChatPage() {

    const dispatch = useDispatch();

    const [selectedSection, setSelectedSection] = useState('oneToOne');
    const [searchedItems, setSearchedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const chatList = useGetRecentChatList();

    // useEffect(() => {
    //     const fetchChatList = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:8000/api/v1/message/getListofOneToOneOldUsers', { withCredentials: true });
    //             if (res.status === 200) {
    //                 setChatList(res.data.list);
    //             }
    //         } catch (error) {
    //             console.log("Error fetching chat list:", error);
    //         }
    //     };
    //     fetchChatList();
    // }, []);

    useGetRecentChatList();

    const searchItems = async (term) => {
        setSearchTerm(term);
        try {
            if (term.length > 0) {
                const res = await axios.post('http://localhost:8000/api/v1/user/followers', { searchTerm: term }, { withCredentials: true });
                if (res.status === 200 && res.data.followers) {
                    setSearchedItems(res.data.followers);
                }
            } else {
                setSearchedItems([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectedItem = (item) => {
        dispatch(setSelectedChatType("OneToOne"));
        dispatch(setSelectedChatData(item));
        setSearchedItems([]);
        setSearchTerm('');
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '95vh', width: '30vw', marginTop: '2vh' }}>
                    <b>Chat with connections</b>
                    <div>
                        <input type='search' value={searchTerm} onChange={(e) => searchItems(e.target.value)} placeholder='Search for Family, Friends and Collegue ...' style={{ margin: '1vh 1vw', width: '28vw', borderRadius: '0.5rem', padding: '5px' }} />
                    </div>
                    <div style={{ width: '90%', height: '40px', display: 'flex', justifyContent: 'space-around', gap: '10px', marginLeft: '1.5vw', alignItems: 'center' }}>
                        <div onClick={() => setSelectedSection('oneToOne')} style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'space-around', backgroundColor: selectedSection === 'oneToOne' ? '#BDBDBD' : 'lightgray', borderRadius: '5px', alignItems: 'center' }}>
                            <div>One to One Chat</div>
                            <div>➕</div>
                        </div>
                        <div onClick={() => setSelectedSection('group')} style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'space-around', backgroundColor: selectedSection === 'group' ? '#BDBDBD' : 'lightgray', borderRadius: '5px', alignItems: 'center' }}>
                            <div>Group Chat</div>
                            <div>➕</div>
                        </div>
                    </div>
                    <div className='Profiles' style={{ overflowY: 'scroll', scrollBehavior: 'smooth', height: '86vh', width: '28vw' }}>
                        {
                            selectedSection === 'oneToOne' ? (
                                searchedItems.length > 0 
                                ? (
                                    searchedItems.map((item) => (
                                        <div onClick={() => handleSelectedItem(item)} key={item.username} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                                            <div className='Avatar'><Avatar /></div>
                                            <div style={{ paddingLeft: '0.5rem' }}>
                                                <div><strong>{item.name}</strong></div>
                                                <div style={{ color: '#1f1f1f', fontSize: '12px' }}>@{item.username}</div>
                                            </div>
                                        </div>
                                    ))
                                   ) 
                                :  (
                                    chatList.length > 0 
                                    ? (
                                        <>
                                            <h4 style={{ marginLeft: '1vw', marginTop: '2vh' }}>Recent Chats</h4>
                                            {chatList.map((chat) => (
                                                <div onClick={() => handleSelectedItem(chat)} key={chat._id} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw', cursor: 'pointer' }}>
                                                    <Avatar src={chat.profilePicture} />
                                                    <div style={{ paddingLeft: '0.5rem' }}>
                                                        <div><strong>{chat.name}</strong></div>
                                                        <div style={{ color: '#1f1f1f', fontSize: '12px' }}>@{chat.username}</div>
                                                        <div style={{ fontSize: '10px', color: 'gray' }}>Last Message: {new Date(chat.lastMessageTime).toLocaleTimeString()}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                      ) 
                                    : (
                                        <div style={{ height: '40vh', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontWeight: 'bolder' }}>
                                            <div>Recents Chat is Empty</div>
                                        </div>
                                      )
                                )
                            ) : (
                                <div>
                                    <div style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                                        <div className='Avatar'><Avatar /></div>
                                        <div style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem' }}>Group 1</div>
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                                        <div className='Avatar'><Avatar /></div>
                                        <div style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem' }}>Group 2</div>
                                    </div>
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









                        // {selectedSection === 'oneToOne' ? (
                        //     <>
                        //         {/* 🔹 Display Searched Users */}
                        //         {searchedItems.length > 0 ? (
                        //             searchedItems.map((item) => (
                        //                 <div onClick={() => handleSelectedItem(item)} key={item.username} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw', cursor: 'pointer' }}>
                        //                     <Avatar src={item.profilePicture} />
                        //                     <div style={{ paddingLeft: '0.5rem' }}>
                        //                         <div><strong>{item.name}</strong></div>
                        //                         <div style={{ color: '#1f1f1f', fontSize: '12px' }}>@{item.username}</div>
                        //                     </div>
                        //                 </div>
                        //             ))
                        //         ) : (
                        //             <div style={{ height: '40vh', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontWeight: 'bolder' }}>
                        //                 <div>Search Contacts for Chat</div>
                        //             </div>
                        //         )}

                        //         {/* 🔹 Display Old Chat List */}
                        //         {chatList.length > 0 && (
                        //             <>
                        //                 <h4 style={{ marginLeft: '1vw', marginTop: '2vh' }}>Recent Chats</h4>
                        //                 {chatList.map((chat) => (
                        //                     <div onClick={() => handleSelectedItem(chat)} key={chat._id} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw', cursor: 'pointer' }}>
                        //                         <Avatar src={chat.profilePicture} />
                        //                         <div style={{ paddingLeft: '0.5rem' }}>
                        //                             <div><strong>{chat.name}</strong></div>
                        //                             <div style={{ color: '#1f1f1f', fontSize: '12px' }}>@{chat.username}</div>
                        //                             <div style={{ fontSize: '10px', color: 'gray' }}>Last Message: {new Date(chat.lastMessageTime).toLocaleTimeString()}</div>
                        //                         </div>
                        //                     </div>
                        //                 ))}
                        //             </>
                        //         )}
                        //     </>
                        // ) : (
                        //     <div>
                        //         <div style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                        //             <Avatar />
                        //             <div style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem' }}>Group 1</div>
                        //         </div>
                        //         <div style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                        //             <Avatar />
                        //             <div style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem' }}>Group 2</div>
                        //         </div>
                        //     </div>
                        // )}

