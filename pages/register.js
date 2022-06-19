import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { userContext } from "../components/context";
import { FormBuilder } from "../components/formBuilder";
import { validator } from "../components/validator";

var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:4002";

var loginServer = process.env.REACT_APP_LOGINSERVER
  ? process.env.REACT_APP_LOGINSERVER
  : "http://localhost:3001";

export default function register() {
  const [user, setUser] = React.useContext(userContext);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const CREATE_ACCOUNT = gql`
    mutation CreateAccount($input: createAccount) {
      createAccount(input: $input) {
        name
        email
        password
        role
      }
    }
  `;
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  async function submit() {
    try {
      if(!validator(name, "name"))
      validator(password, "password");
      validator(email, "email");

      let response = await createAccount({
        variables: {
          input: {
            name: name,
            email: email,
            password: password,
            role: isAdmin ? "admin" : "user",
          },
        },
      })
      if(response && response.data) {
          if(response.data.createAccount.email){
            fetch(loginServer + "/loginEmail", {
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
                  password,
                }),
              })
                .then((response) => response.json())
                .then((result) => {
                  if (result) {
                    setUser({ email: email, role: result.role, key: { result } });
                  } else {
                    setError("Wrong User Or Password!");
                  }
                });
          }
      }
      
    
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }
  let formBuilderData = {
    Name: [name, setName],
    Password: [password, setPassword],
    Email: [email, setEmail],
    "Is Admin": [isAdmin, setIsAdmin],
    "Create User": ["", submit],
  };

  return (
    <>
    {user?<h1 className="text-success">Welcome {name}</h1>:<>
      <h2>Register User</h2>
      <FormBuilder {...formBuilderData} />
      {error ? <h3 className="text-danger">{error}</h3> : ""}
      </>
    }
    </>
  );
}
