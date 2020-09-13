import React from 'react';

function Login() {
    return (
        <div className="loginForm">
        <form  >
            <label >Username:</label>
            <input className="user" type="text" ></input>
            <br/>
            <label  >Password:</label>
            <input className="password" type="text" ></input>
            <br/>
            <br/>
           <div >
           <button >Login</button>
           </div>
        </form>
    </div>
    )
}

export default Login