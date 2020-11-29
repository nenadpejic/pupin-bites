import React, { useState } from 'react'
import { register } from '../services';


export const Register = ()=> {
    const [newUser,setNewUser] = useState({
        email: "",
        password: "",
        firstName: "", // dodati input polje
        lastName: "" // dodati input polje
      })
    
      const handleUserInput = (e) => {
        const { name, value } = e.target;
        


        setNewUser((prevUser) => {
          return {
            ...prevUser,
            [name]: value.toLowerCase(),
          };
        });
      };


      const registration = (e) => {
        e.preventDefault();
      
        if (newUser.username !== "" && newUser.password !== "") {
          register(newUser)
            .then((res) => {
              console.log(res)
              localStorage.setItem("LoggedUser", JSON.stringify(newUser));
              setNewUser({ email:"", password:"" });
              
            })
            .catch((err) => {
              console.log("AXIOS ERROR: ", err);
              
              setNewUser({ email: "", password: "" });
            });
        }
    
      };
      
      return (<>
                <form onSubmit={registration}>
                    <input  type="text"
                            placeholder='Enter Email'
                            onChange={handleUserInput}
                            value={newUser.email}
                            name="email"
                            />
                    
                    <input type='text'
                           placeholder = 'Enter password'
                           onChange={handleUserInput}
                           value={newUser.password}
                           name="password"
                    />

                    <input type='submit'/>
                </form>

              </>)

}