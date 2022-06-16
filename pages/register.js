import React from "react";
import AppContext from "../components/context";
import { FormBuilder } from "../components/formBuilder";
import { validator } from "../components/validator";

var server = process.env.REACT_APP_SERVER
? process.env.REACT_APP_SERVER
: "http://localhost:3000";

var loginServer = process.env.REACT_APP_LOGINSERVER
?process.env.REACT_APP_LOGINSERVER
:"http://localhost:3001";
console.log(process.env)

var API = process.env.API ? process.env.API : "/api";

export default function register() {
    const {user,setUser} = React.useContext(AppContext);
    const [name,setName] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [error,setError] = React.useState('');
    const [isAdmin,setIsAdmin] = React.useState(false);
    async function submit (){
        try{
            validator(name,'name');
            validator(password,'password');
            validator(email,'email');
            await fetch(server + API + "/account", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type, Accept",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    'deposit':0,
                    isAdmin,

                  })
                })
                .then((response) => response.json())
                .then(
                    (result) => {
                        if(result.error){   
                            setError(result.error);
                        }
                        else{
                            if(!user){
                                fetch(loginServer+"login",{
                                    method:"POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        "Access-Control-Allow-Origin": "*",
                                        "Access-Control-Allow-Headers":
                                          "Origin, X-Requested-With, Content-Type, Accept",
                                      },
                                      body: JSON.stringify({
                                        name,
                                        password
                                      }),   
                                })
                                .then((response) => response.json())
                                .then(
                                    (result) => {
                                        if(result){
                                            setUser({user:{name},key:{result}});
                                        }
                                        else{
                                            setError('Wrong User Or Password!');
                                        }
                                    }
                                )
                            }
                        }
                    }

                )

        }
        catch (err) {
            console.log(err);
            setError(err);
        }
    }
    let formBuilderData = {
        "Name":[name,setName],
        "Password":[password,setPassword],
        "Email":[email,setEmail],
        "Is Admin":[isAdmin,setIsAdmin],
        "Create User":['',submit]
      }
    return(
        <>
        <h2>Register User</h2>
        <FormBuilder {...formBuilderData}/>
        </>
    )
}