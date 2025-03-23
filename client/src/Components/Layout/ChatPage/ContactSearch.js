import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedChatType, setSelectedChatData} from '../../../redux/chatSlice.js';
import './ChatPage.css';
import { Avatar } from '@mui/material';
import axios from 'axios';


function ContactSearch({onClose}) {

    const dispatch = useDispatch();
    const [searchedItems, setSearchedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
        onClose();
    };

    return (
            <div style={{ height: '30vh', width: '20vw', marginTop: '2vh' }}>
                
                <div>
                    <input type='search' value={searchTerm} onChange={(e) => searchItems(e.target.value)} placeholder='Search for Family, Friends and Collegue ...' style={{ margin: '1vh 1vw', width: '23vw', height:'40px', borderRadius: '0.5rem', padding: '10px' }} />
                </div>
                <div className='Profiles' style={{ overflowY: 'scroll', scrollBehavior: 'smooth', height: '86vh', width: '28vw' }}>
                    {
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
                            <div></div>
                            )
                    }
                </div>
            </div>
    );
}

export default ContactSearch;