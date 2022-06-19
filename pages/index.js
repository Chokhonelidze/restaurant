
import { useContext, useState } from "react";
import Restaurant from "./restaurants/index";
import { InputGroup, InputGroupAddon,Input } from "reactstrap";
import { userContext } from "../components/context";
import { Button } from "reactstrap";
import Link from "next/link";

export default function Home() {
  let [search, setSearch] = useState("");
  const [user,setUser] = useContext(userContext);
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
      {user.role === "admin" ? (
        <div key='divCreateRestaurant'>
          <Button color='primary' >
          <Link key="createRestaurant" href="restaurants/createRestaurant">
            <a>Create Restaurant</a>
          </Link>
          </Button>
        </div>
      ) : (
        ""
      )}
      <div className="body">
      <Restaurant search={search} />
      </div>
    </>
  );
}
