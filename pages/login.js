import React from "react";
import {Card} from "../components/cards";
import {userContext} from "../components/context";


var server = process.env.REACT_APP_SERVER
? process.env.REACT_APP_SERVER
: "http://localhost:3000";

var loginServer = process.env.REACT_APP_LOGINSERVER
?process.env.REACT_APP_LOGINSERVER
:"http://localhost:3001";
console.log(process.env)

var API = process.env.API ? process.env.API : "/api";
function Login(){
    const [user,setUser] = React.useContext(userContext);
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [error,setError] = React.useState('');

     async function checkUser(){
        await fetch(loginServer+"/loginEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
          body: JSON.stringify({
            email,
            password
          }),
        })
        .then((response) => response.json())
            .then(
              (result) => {
                if (result && result.accessToken != '') {
                  setUser({email:email,role:result.role,key:{result}});
                  console.log(user);
                  //window.location.href="/"
                }
                else{
                    setError('Wrong User Or Password!');
                }
              },
              (error) => {
                setError('Wrong User Or Password!');
                console.log(error);
              }
            );
    }
    function loginHandle(){
        if(email && password){
            checkUser();
        }
    }
    async function logout(){
      await fetch(loginServer+"/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        body: JSON.stringify({
          "token":user.key.result.accessToken
        }),
      }).then(setUser(null));
    }
    return (
        <Card 
        txtcolor="black"
        header="Login"
        body = {user ? (
          <>
            <h5 className="text-success">Welcome {user.email}</h5>
            <button type='subbmit' className="btn btn-primary"  onClick={logout}>logout</button>     
          </>
            
        ):(
            <>
            <h5>User:</h5>
            <br/>
            <input className='form-control' type='email' name='email' placeholder="Email" onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            <br/>
            <h5>Password:</h5>
            <br/>
            <input  className='form-control' type='password' name = 'password' placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value);
            }} />
            <br/>
            <h5 className="text-danger">{error?(<>{error}</>):''}</h5>
            <button className="btn btn-primary" type='submit' onClick={loginHandle}>LOGIN</button>
            </>
            
        )}
        />
    );
}
export default Login;