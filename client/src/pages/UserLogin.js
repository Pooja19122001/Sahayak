import { useState } from 'react';
import "../Styles/UserLogin.css";

export const User=()=> {
    const [username, setUsername] = useState(""); //username="roshni"
    const [age, setAge] = useState("");
    const [phone_no, setPhone_no] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const collectData = async (e)=>
    {
        e.preventDefault();
        let result = await fetch("http://localhost:3000/user",
        {
            method: "POST",
            body: JSON.stringify({username, age, phone_no, address, email, password}),
            headers: {'Content-Type': 'application/json'},
        })
        // result = await result.json;

        // localStorage.setItem("users", JSON.stringify(result));
    }

    return(
            <div class='wrapper'>
                <form onSubmit={collectData} method="post">
                    <h2>User Registration</h2>
                    <div class="input-box">
                        <input type="username" name="username" placeholder="Username" required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        <i class='bx bxs-user'></i>
                    </div>
                    <div class="input-box">
                        <input type="number" name="age" placeholder="Age" required
                         value={age}
                         onChange={(e) => setAge(e.target.value)}/>
                        <i class='bx bxs-user'></i>
                    </div>
                    <div class="input-box">
                        <input type="number" name="phone_no" placeholder="Phone" required
                         value={phone_no}
                         onChange={(e) => setPhone_no(e.target.value)}/>
                        <i class="bi bi-telephone-plus"></i>
                    </div>
                    <div class="input-box">
                        <input type="Address" name="address" placeholder="Address" required
                         value={address}
                         onChange={(e) => setAddress(e.target.value)}/>
                        <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    <div class="input-box">
                        <input type="email" name="email" placeholder="Email" required
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}/>
                        <i class="bi bi-envelope-at-fill"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" name="password" placeholder="Password" required
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}/>
                        <i class='bx bx-lock'></i>
                    </div>
                
                    <button type="submit" class="btn">Register</button>
                
                </form>
            </div>
    
    )
  }