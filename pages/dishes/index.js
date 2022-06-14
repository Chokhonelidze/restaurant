
import { DishCard } from "../../components/cards";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { InputGroup,Input } from "reactstrap";
import "../../styles/Home.module.css";


export default function dishes(){
    const [search,setSearch] = React.useState('');
    function GetAllDishes({search,limit,offset}) {
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
        let { loading, error, data } = useQuery(GET_DISHES,{variables:{"input":{"search":search,"limit":limit,"offset":offset}}});
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>ERROR</p>;
        if (!data) return <p>Not found</p>;
        return data.getDish.map((item,index)=>{
            return <DishCard key={"dish"+index}
            image = {item.image}
            name = {item.name}
            description = {item.description}
            price = {item.price}
            />
        })
    }
    return(
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
          <GetAllDishes search={search} limit={100} offset={0} />
      </div>
        </>
    )
}