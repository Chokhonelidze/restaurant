
import { useState } from "react";
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
      <div className="body">
      <Restaurant search={search} />
      </div>
    </>
  );
}
