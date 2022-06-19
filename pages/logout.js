
export default async function logout(){


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
        }).then(setUser(null))
      
      return (<></>)
}