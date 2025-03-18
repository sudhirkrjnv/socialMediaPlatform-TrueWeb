import { useState} from 'react';
import './ChatPage.css';
import { Avatar } from '@mui/material';
import axios from 'axios';
import MessagesContainer from './MessagesContainer/MessagesContainer';

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
    
    return(
        <>
            <div style={{display:'flex'}}>
                <div style={{height:'95vh', width:'30vw', marginTop:'2vh'}}><b>Chat with connection here : </b>
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
                            (
                                searchedItems.length > 0
                                ? searchedItems.map((user) => (
                                    <div onClick={() => setSelectedUser(user)} key={user.username} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                                        <div className='Avatar'><Avatar /></div>
                                        <div style={{paddingLeft: '0.5rem' }}>
                                            <div><strong>{user.name}</strong></div>
                                            <div style={{color:'#1f1f1f', fontSize:'12px'}}>@{user.username}</div>
                                        </div>
                                    </div>
                                ))
                                :
                                suggestedUsers.map((user) => (
                                    <div onClick={() => setSelectedUser(user)} key={user.username} style={{ display: 'flex', marginTop: '1vh', marginLeft: '1vw' }}>
                                        <div className='Avatar'><Avatar /></div>
                                        <div style={{paddingTop:'0.5rem',paddingLeft: '0.5rem' }}>
                                            <div><strong>{user.username}</strong></div>
                                        </div>
                                    </div>
                                ))

                            )
                        : 
                            (
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
                <MessagesContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
        </>
    );
}
export default ChatPage;