import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './client';

export default function Login() {

    let navigate= useNavigate()

    const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setMail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("btnclick");

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: mail,
            password: password,
        });

        if (error) {
            // Handle login error
            console.error("Login error:", error.message);
            alert(`Error: ${error.message}`);
        } else {
            // Only navigate if login is successful
            console.log("Login successful:", data);
            sessionStorage.setItem('userToken', data.session.access_token);
            sessionStorage.setItem('userId', data.user.id);
            alert("Login successful");
            navigate('/caller');
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred. Please try again later.");
    }
};


  return (
    <div>
    <h1>Login</h1>
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
      <h3>Dont have an account <Link to="/">Signup</Link></h3>
    </div>
  )
}
