import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChatMessages } from '../redux/ChatSlice';

const useGetAllMessages = () => {
    const { selectedChatType, selectedChatData } = useSelector((store) => store.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOneToOneMessages = async () => {
            try {
                const res = await axios.get( `http://localhost:8000/api/v1/message/${selectedChatData?._id}/getmessages`, { withCredentials: true } );
                if (res.data.success) {
                    dispatch(setSelectedChatMessages(res.data.messages));
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        const fetchGroupMessages = async () => {
            try {
                const res = await axios.get( `http://localhost:8000/api/v1/message/${selectedChatData?._id}/getgroupmessages`, { withCredentials: true } );
                if (res.data.success) {
                    dispatch(setSelectedChatMessages(res.data.messages));
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (selectedChatData?._id) {
            if (selectedChatType === "OneToOne"){
                fetchOneToOneMessages();
            } else if (selectedChatType === "Group"){
                fetchGroupMessages();
            }
        }

    }, [selectedChatData, selectedChatType, dispatch]);

    return null;
};

export default useGetAllMessages;