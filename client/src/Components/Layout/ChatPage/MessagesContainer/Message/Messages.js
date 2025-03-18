import './Messages.css';
function Messages({selectedChatData}){
    let messages = [
        {id:"sender", text:"Hi!"},
        {id:"receiver", text:"Hello"},
        {id:"sender", text:"Kya haal hai ?"},
        {id:"receiver", text:"Sb mst  hai"},
        {id:"sender", text:"Kha ho abhi ?"},
        {id:"receiver", text:"Home town"},
        {id:"sender", text:"Kb College Chaloge ?"},
        {id:"receiver", text:"College Start hone ke first week me"},
        {id:"sender", text:"Ok"},
        {id:"sender", text:"👍"}
        
    ]

    return (
        <>
        <div className="messagesContainer" style={{height:'100%', width:'100%', overflowY:'scroll', scrollBehavior:'smooth' }}>
            {
                messages.map((msg, index)=>{
                    return(
                        <div key={index} style={{display:'flex', justifyContent: msg.id === "sender" ? 'flex-start' : 'flex-end', color: msg.id === "sender" ? 'blue' : 'green'}}>
                            <div style={{margin:'0.5rem' , backgroundColor: msg.id === "sender" ? 'lightblue' : 'lightgreen', minHeight:'2rem',maxWidth:'45%', borderRadius:'0.5rem', padding:'0.2rem'}}>{msg.text}</div>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}
export default Messages;