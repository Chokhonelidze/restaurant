import client from "../apollo/apolloClient";
import localStorage from "localStorage";
export default async function logout(){
  var loginServer = process.env.REACT_APP_LOGINSERVER
  ?process.env.REACT_APP_LOGINSERVER
  :"http://localhost:3001";

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
        }).then(()=>{
          client.resetStore();
          client.cache.reset();
          setUser(null);
          localStorage.clear();
        });
      
      return (<>success</>)
}