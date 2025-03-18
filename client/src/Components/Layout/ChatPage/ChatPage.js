import { useState} from 'react';
import { useDispatch} from 'react-redux';
import {setSelectedChatType, setSelectedChatData} from '../../../redux/ChatSlice.js';
import './ChatPage.css';
import { Avatar } from '@mui/material';
import axios from 'axios';
import MessagesContainer from './MessagesContainer/MessagesContainer';
import { Search } from '@mui/icons-material';

function ChatPage(){

    const dispatch = useDispatch();

    const [selectedSection, setSelectedSection] = useState('oneToOne');
    const [searchedItems, setSearchedItems] = useState([]);

    const searchItems = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const res = await axios.post('http://localhost:8000/api/v1/user/followers', { searchTerm }, { withCredentials: true });
                if (res.status === 200 && res.data.followers) {
                    setSearchedItems(res.data.followers);
                }
            } else {
                setSearchedItems([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectedItem = (item) => {
        dispatch(setSelectedChatType("OneToOne"));
        dispatch(setSelectedChatData(item));
        setSearchedItems([]);
    };

    
    return(
        <>
            <div style={{display:'flex'}}>
                <div style={{height:'95vh', width:'30vw', marginTop:'2vh'}}><b>Chat with connections </b>
                    <div>
                        <input type='search' onChange={(e) => searchItems(e.target.value)} placeholder='Search for Family, Friends and Collegue ...' style={{ margin: '1vh 1vw 1vh 1vw', width: '28vw', borderRadius: '0.5rem', padding: '5px ' }} />
                    </div>
                    <div style={{width:'90%', height:'40px', display:'flex', justifyContent:'space-around', gap:'10px', marginLeft:'1.5vw', alignItems:'center'}}>
                        <div onClick={()=> setSelectedSection('oneToOne')} style={{width:'100%', height:'40px', display:'flex', justifyContent:'space-around', backgroundColor: selectedSection === 'oneToOne' ? '#BDBDBD' : 'lightgray', borderRadius:'5px', alignItems:'center'}}>
                            <div>One to One Chat</div>
                            <div>➕</div>
                        </div>
                        <div onClick={()=> setSelectedSection('group')} style={{ width:'100%', height:'40px', display:'flex', justifyContent:'space-around', backgroundColor: selectedSection === 'group' ? '#BDBDBD' : 'lightgray', borderRadius:'5px', alignItems:'center'}}>
                            <div>Group Chat</div>
                            <div>➕</div>
                        </div>
                    </div>
                    <div className='Profiles' style={{overflowY:'scroll',scrollBehavior:'smooth' ,height:'86vh', width:'28vw'}}>
                    {
                        selectedSection === 'oneToOne'
                        ? 
                            (   //This is for one to one with having search contacts
                                searchedItems.length > 0
                                ? searchedItems.map((item) => (
                                    <div onClick={() => handleSelectedItem(item)} key={item.username} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                                        <div className='Avatar'><Avatar /></div>
                                        <div style={{paddingLeft: '0.5rem' }}>
                                            <div><strong>{item.name}</strong></div>
                                            <div style={{color:'#1f1f1f', fontSize:'12px'}}>@{item.username}</div>
                                        </div>
                                    </div>
                                ))
                                : 
                                (   // this is for one to one having no any searched contacts
                                    <div style={{height:'40vh', width:'80%', display:'flex', justifyContent:'center', alignItems:'center', color:'red', fontWeight:'bolder'}}>
                                        <div>Search Contacts for Chat</div>
                                    </div>
                                )
                            )
                        : 
                            (   // This is for group
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