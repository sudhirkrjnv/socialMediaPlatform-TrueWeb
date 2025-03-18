import { useState} from 'react';
import './ChatPage.css';
import { Avatar } from '@mui/material';
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
                <MessagesContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
        </>
    );
}
export default ChatPage;