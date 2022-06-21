import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import localStorage from "localStorage";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002";
console.log(`URL: ${API_URL}`);
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  console.log("token",token);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});
const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
}
);
export default client;
