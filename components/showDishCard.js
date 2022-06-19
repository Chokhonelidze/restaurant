import { gql, useQuery } from "@apollo/client";
import { userContext } from "./context";
import React from "react";
import { DishCard } from "./cards";
export function ShowCards(props) {
  

    return(
      <div className="small_card " key={props.id}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
          }}
        ></div>
        <img
          className="smalImage"
          src={props.image}
          alt="Card"
          draggable="false"
        />
        <div className="small-card-body">
          <h5 className="small-card-title">{props.name}</h5>
          <div className="card-text">
            {props.description}
            {props.price}$
          </div> 
          <div>
              <button className="btn btn-primary" id={props.id} onClick={(e)=>{
                props.action(e.target.id);
              }}>{props.action_name}</button>
          </div>
        </div>
      </div>
    );
  }
  export function ExistingCards(props){
    const [user,setUser] = React.useContext(userContext);
    const [dishes,setDishes] = React.useState(props.dishes);
    console.log(dishes);
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
    let { loading, error, data } = useQuery(GET_DISHES,{variables:{"input":{"id":props.id}}});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    
    return data.getDish.map((item,index)=>{
      return <DishCard key={item.name + index} {...item} />
    })

    
  }