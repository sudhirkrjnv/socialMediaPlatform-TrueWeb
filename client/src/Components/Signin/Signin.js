import React, { useState } from 'react';
import './Signin.css'
import axios from 'axios';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [input, setInput] = useState({username:'', email:"", password:''});
  const inputHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }

  const navigate = useNavigate();

  const signinHandler = async(e)=>{
    e.preventDefault();
    try {
      const res =  await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(res.data.success){
        toast.success(res.data.message);
        setTimeout(()=>{
          navigate('/')
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "something went worng");
    }
  }
  return (
    <>
      <div className='formcontainer'>
        <diV>
          <center><h2>TrueWeb</h2><h5>Signin & Lets Enjoy with Friends, Family and many more 😊...</h5></center>
          <form onSubmit={signinHandler}>
            <div>
              
              Email<br/><input className='inputbox' type="email" name="email" value={input.email} onChange={inputHandler} /><br/>
              Password<br/><input className='inputbox' type="password" name="password" value={input.password} onChange={inputHandler} /><br/>
              <center><button style={{marginTop:'2vh'}} type='submit'>Signin</button></center>
            </div>
          </form>
        </diV>
      </div>
      <ToastContainer/>
    </>
  );
}
export default Signin;
