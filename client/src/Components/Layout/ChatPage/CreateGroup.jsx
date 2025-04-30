import React, { useEffect , useState} from 'react'
import axios from 'axios';
import { MultiSelect } from 'primereact/multiselect';
import { useSelector, useDispatch } from 'react-redux';
import { addGroupList } from '../../../redux/ChatSlice.js';

function CreateGroup({onClose}) {

      const [allMembers, setAllMembers] = useState([]);
      const [selectedMembers, setSelectedMembers] = useState([]);
      const [groupName, setGroupName] = useState("");
      const { socket } = useSelector((store) => store.socket);
      const dispatch = useDispatch();
      
      useEffect(()=>{
        const getMembers = async ()=>{
          const res = await axios.get('http://localhost:8000/api/v1/user/allMembers', { withCredentials: true });
          if (res.status === 200 && res.data.members) {
            setAllMembers(res.data.members);
          }
        };
        getMembers();
      },[])
      
      const creategroup = async()=>{
        try {
          if(groupName.length >= 0 && selectedMembers.length > 0){
            const res = await axios.post('http://localhost:8000/api/v1/message/createGroup',
              {
                name: groupName, 
                members: selectedMembers.map((member)=>member.value)
              },
              {withCredentials:true}
            )
            if(res.status === 201){
              setGroupName("");
              setSelectedMembers([]);
              onClose();
              dispatch(addGroupList(res.data.group));
              socket.emit('newGroupCreated', {
                group: res.data.group,
                memberIds: selectedMembers.map(m => m.value)
              });
              if(res.data.systemMessage) {
                dispatch(addMessage({
                    ...res.data.systemMessage,
                    groupId: res.data.group._id,
                    sender: { _id: user._id, name: user.name }
                }));
              }
            }
          }
          
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div style={{height:'100%', width:'100%'}}>
        <div style={{display:'flex', justifyContent:'center'}}>
          <span style={{fontSize:'20px'}}><b>Create Group</b></span><br/>
        </div>

        {/* Group Name */}
        <span style={{fontFamily:'cursive'}}>Group Name : </span>
        <div style={{border:'1px solid #ccc', borderRadius:'10px', marginTop:'5px', marginBottom:'10px'}}>
            <input type='text' value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder='Please Enter Group Name' style={{border:'none', outline:'none', padding:'10px', display:'inline-block'}} />
        </div>

        {/* Selecting members */}
        <span style={{fontFamily:'cursive'}}>Select Members : </span>
        <div style={{borderRadius:'10px', marginTop:'5px', marginBottom:'10px', display:'flex', justifyContent:'center'}}>
          <MultiSelect value={selectedMembers.map(m => m.value)} onChange={(e) => setSelectedMembers(allMembers.filter(m => e.value.includes(m.value)))} options={allMembers} optionLabel="label"
            filter placeholder="Search Members" maxSelectedLabels={10} className="w-full md:w-20rem" style={{border:'1px solid #ccc'}}
          />
        </div>
        

        {/* Create channel Button */}
        <div style={{ width: '100%', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px'}}>
          <button onClick={creategroup} style={{ padding: '8px 16px',boxShadow: '2px 2px 2px 1px #ccc',outline: 'none',border: 'none',borderRadius: '4px',backgroundColor: '#eee',cursor: 'pointer',transition: 'all 0.3s ease'}}onMouseOver={(e) => {e.currentTarget.style.color = 'green';e.currentTarget.style.backgroundColor = '#ccc';}}onMouseOut={(e) => {e.currentTarget.style.color = 'black'; e.currentTarget.style.backgroundColor = '#eee';}}>
            <b>Create</b>
          </button>
      </div>
    </div>
  )
}

export default CreateGroup;