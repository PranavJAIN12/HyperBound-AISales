import React, { useState } from "react";
import { supabase } from "./client";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export default function Signup() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setMail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    
    console.log("Button Clicked");
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email: mail,
        password: password,
      });
  
      if (error) {
        // Handle signup error
        console.error("Signup error:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        // Signup successful, check email for verification
        alert("Check your email for the verification link.");
        console.log("Signup successful:", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred. Please try again later.");
    }
  };
  
  return (
    <div>
    <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-4">
          <label htmlFor="emailinput" className="form-label">
            Enter your Email
          </label>
          <input
            type="email"
            className="form-control"
            id="weightInput"
            value={mail}
            onChange={handleEmailChange}
            aria-describedby="weightHelp"
            placeholder="enter mail"
          />
          <div id="mailHelp" className="form-text">
            We'll never share your e-mail with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Enter Your password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handlePassChange}
            id="heightInput"
            placeholder="enter pass"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {/* <button className='btn btn-primary mx-3' onClick={reload}>Reload</button> */}
      </form>
      <h5>Already Have an account  <Link to='/login'>Login</Link> </h5>
    </div>
  );
}
