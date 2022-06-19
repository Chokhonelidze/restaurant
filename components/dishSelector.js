import {ShowCards} from "./showDishCard";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import {Input,InputGroup} from "reactstrap"

export default function DishSelector(props) {
    const [search,setSearch] = React.useState('');
  function GetAllDishes({ search, limit, offset }) {
    const GET_DISHES = gql`
      query GetDish($input: inputDishes) {
        getDish(input: $input) {
          id
          name
          description
          price
          image
        }
      }
    `;
    let { loading, error, data } = useQuery(GET_DISHES, {
      variables: { input: { search: search, limit: 100, offset: 0 } },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    const dishAdd = (val)=>{
      props.setDishes([...props.dishes,val]);
    }
    return data.getDish.map((item, index) => {
      if(props.dishes && props.dishes.includes(item.id))return null;
      return (
        <ShowCards
          key={"dish" + index}
          id = {item.id}
          image={item.image}
          name={item.name}
          description={item.description}
          price={item.price}
          action = {dishAdd}
          action_name = "+"
        />
      );
    });
  }
  return (
    <>
      <div className="search">
        <h2> Dishes</h2>
        <InputGroup>
          <Input
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            value={search}
          />
        </InputGroup>
        <br></br>
      </div>
      <div className="body">
        <GetAllDishes search={search}  dishes={props.dishes} setDishes={props.setDishes} />
      </div>
    </>
  );
}
