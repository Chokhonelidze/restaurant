import { useContext, useState } from "react";
import Head from "next/head";
import {userContext,cartContext} from "../components/context";
import Layout from "../components/layout"
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/apolloClient";
import Cart from "../components/cart";
import "../styles/globals.css";
import "../styles/popup.css";

function MyApp(props){
  const [user,setUser] = useState('');
  const [cart,setCart] = useState({});
  const { Component, pageProps } = props;
  
  return (
 
    <userContext.Provider value={[user,setUser]}>
      <cartContext.Provider value={[cart,setCart]}>
      <ApolloProvider client={client} >
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
    
      <Layout>
          <Component {...pageProps} />
      </Layout>
      <Cart />
      </ApolloProvider>
      </cartContext.Provider>
    </userContext.Provider>
  
  );
  
}


export default MyApp;
