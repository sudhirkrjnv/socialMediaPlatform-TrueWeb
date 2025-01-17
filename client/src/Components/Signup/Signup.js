import React, { useState } from 'react';
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';


function Signup() {
  const [input, setInput] = useState({username:"", email:"", password:""});
  const inputHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }
  //console.log(input);
  const navigate = useNavigate();

  const SignupHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message);
        //navigate('/signin');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
        //console.log(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  }


  return (
    <>
      <div className='formcontainer'>
        <diV>
        <center><h2>TrueWeb</h2><h5>Signup to Communicate with the leading worlds ...</h5></center>
          <form onSubmit={SignupHandler}>
            <div>
              Username<br/><input className='inputbox' type="text" name="username" placeholder="username" value={input.username} onChange={inputHandler} /><br/>
              Email<br/><input className='inputbox' type="email" name="email" placeholder="email" value={input.email} onChange={inputHandler} /><br/>
              Password<br/><input className='inputbox' type="password" placeholder="password eg., Abcd@1234" name="password" value={input.password} onChange={inputHandler} /><br/>
              <center><button style={{marginTop:'2vh'}} type='submit'>SignUp</button></center>
            </div>
          </form>
        </diV>
      </div>
      <ToastContainer />
    </>
  );
}
export default Signup;
