import { useEffect, useState } from 'react';
import axios from "axios";

const useGetRecentChatList = () => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const fetchRecentChatList = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/message/recentUsersList', { withCredentials: true });
                if (res.status === 200) {
                    setChatList(res.data.list);
                }
            } catch (error) {
                console.log("Error fetching chat list:", error);
            }
        };
        fetchRecentChatList();
    }, []);

    return chatList;
};

export default useGetRecentChatList;
