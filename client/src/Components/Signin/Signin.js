import React, { useState } from 'react';
import './Signin.css'

function Signin() {
  const [input, setInput] = useState({username:'ABCD1234', email:"abcd@gmail.com", password:""});
  const inputHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }
  return (
    <>
      <div className='formcontainer'>
        <diV>
          <center><h2>TrueWeb</h2><h5>Signin & Lets Enjoy with Friends, Family and many more 😊...</h5></center>
          <form>
            <div>
              
              Email<br/><input className='inputbox' type="email" name="email" value={input.email} onChange={inputHandler} /><br/>
              Password<br/><input className='inputbox' type="password" name="password" value={input.password} onChange={inputHandler} /><br/>
              <center><button style={{marginTop:'2vh'}} type='submit'>Signin</button></center>
            </div>
          </form>
        </diV>
      </div>
    </>
  );
}
export default Signin;
