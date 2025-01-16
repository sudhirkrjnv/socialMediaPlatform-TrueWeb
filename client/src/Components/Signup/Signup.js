import React, { useState } from 'react';
import './Signup.css'

function Signup() {
  const [input, setInput] = useState({username:'ABCD1234', email:"abcd@gmail.com", password:""});
  const inputHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }
  console.log(input);
  return (
    <>
      <div className='formcontainer'>
        <diV>
        <center><h2>TrueWeb</h2><h5>Signup to Communicate with the leading worlds ...</h5></center>
          <form>
            <div>
              Username<br/><input className='inputbox' type="text" name="username" value={input.username} onChange={inputHandler} /><br/>
              Email<br/><input className='inputbox' type="email" name="email" value={input.email} onChange={inputHandler} /><br/>
              Password<br/><input className='inputbox' type="password" name="password" value={input.password} onChange={inputHandler} /><br/>
              <center><button style={{marginTop:'2vh'}} type='submit'>SignUp</button></center>
            </div>
          </form>
        </diV>
      </div>
    </>
  );
}
export default Signup;
