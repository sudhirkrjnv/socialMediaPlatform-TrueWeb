import moment from 'moment';
import './Messages.css';
import {useSelector} from 'react-redux';
import { useEffect, useRef } from 'react';
import useGetAllMessages from '../../../../../Hooks/useGetAllMessages';

function Messages({}){

    const { selectedChatType, selectedChatData, selectedChatMessages } = useSelector((store) => store.chat);
    const {user} = useSelector(store=>store.auth);

    const scrollRef = useRef();
    const messagesContainerRef = useRef();

    let lastdate = null;

    useGetAllMessages();

    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollIntoView({behavior:"smooth"});
        }
    }, [selectedChatMessages]);


    return (
        <>
        <div ref={messagesContainerRef} className="messagesContainer" style={{height:'100%', width:'100%', overflowY:'scroll', scrollBehavior:'smooth' }}>
            {
                selectedChatMessages.map((msg, index)=>{
                    const msgDate = moment(msg.timestamp).format("YYYY-MM-DD");
                    const showDate = msgDate !== lastdate;
                    lastdate = msgDate;
                    return(
                        <div key={index}>
                            { showDate && ( <div style={{textAlign:'center', marginBottom:'10px', fontSize:'12px', color: "#666"}}>{moment(msg.timestamp).format("LL")}</div> ) }
                            {
                                selectedChatType === "OneToOne"
                                &&
                                <div style={{display:'flex', justifyContent: msg.sender === selectedChatData._id ? 'flex-start' : 'flex-end' }}>
                                    {
                                        msg.messageType === "text" && (
                                            <div style={{backgroundColor: msg.sender === selectedChatData._id ? "#FFFFFF" : "#D9FDD3", marginBottom: "8px" , maxWidth: "60%", padding: "10px", borderRadius: "10px", wordBreak: "break-word", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", position: "relative"}}>
                                                <diV style={{fontSize: "14px", lineHeight: "1.5",}}>
                                                    {msg.content}
                                                </diV>
                                                <div style={{ fontSize: "10px", color: "#666", textAlign: "right", marginTop: "5px"}}>
                                                    {moment(msg.timestamp).format("LT")}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            {
                                selectedChatType === "Group"
                                &&
                                <div style={{display:'flex', justifyContent: msg.sender._id !== user._id ? 'flex-start' : 'flex-end' }}>
                                    {
                                        msg.messageType === "text" && (
                                            <div style={{backgroundColor: msg.sender._id !== user._id ? "#FFFFFF" : "#D9FDD3", marginBottom: "8px" , maxWidth: "60%", padding: "10px", borderRadius: "10px", wordBreak: "break-word", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", position: "relative"}}>
                                                <diV style={{fontSize: "14px", lineHeight: "1.5",}}>
                                                    {msg.content}
                                                </diV>
                                                <div style={{ fontSize: "10px", color: "#666", textAlign: "right", marginTop: "5px"}}>
                                                    {moment(msg.timestamp).format("LT")}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    )
                })
            }
            <div ref={scrollRef} />
        </div>
        </>
    )
}
export default Messages;