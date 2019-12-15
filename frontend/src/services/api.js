/* import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});
 */
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000"
});

export default client;
