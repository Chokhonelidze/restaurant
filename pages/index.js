import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Restaurant from "./restaurants/index";
import { InputGroup, InputGroupAddon,Input } from "reactstrap";

export default function Home() {
  let [search, setSearch] = useState("");
  return (
    <>
      <div className="search">
        <h2> Local Restaurants</h2>
        <InputGroup>
          <Input
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            value={search}
          />
        </InputGroup>
        <br></br>
      </div>
      <Restaurant search={search} />
    </>
  );
}
