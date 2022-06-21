import { gql, useQuery, useMutation } from "@apollo/client";
import { userContext, cartContext } from "./context";
import React from "react";
import { DishCard } from "./cards";
export function ShowCards(props) {
  return (
    <div className="small_card " key={props.id}>
      <div style={{ cursor: "pointer" }} onClick={() => {}}></div>
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
          <button
            className="btn btn-primary"
            id={props.id}
            onClick={(e) => {
              props.action(e.target.id);
            }}
          >
            {props.action_name}
          </button>
        </div>
      </div>
    </div>
  );
}
export function ExistingCards(props) {
  const [user, setUser] = React.useContext(userContext);
  const [cart, setCart] = React.useContext(cartContext);
  const [dishes, setDishes] = React.useState(props.dishes);
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
    variables: { input: {search:props.search} },
  });
  const UPDATE_RESTAURANT = gql`
    mutation UpdateRestaurant($input: updateRestaurant) {
      updateRestaurant(input: $input) {
        id
        dishes
      }
    }
  `;
  const [updateRestaurant] = useMutation(UPDATE_RESTAURANT);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  let filtered = data.getDish.filter((item) => {
    return dishes.includes(item.id);
  });
  const deleteButton = async (e) => {
    let newData = await dishes.filter((item) => {
      return item != e.target.id;
    });
    setDishes(newData);
    let response = await updateRestaurant({
      variables: {
        input: {
          id: props.id,
          dishes: newData,
        },
      },
    });
  };
  const addItemToCart = async (e) => {
    let item = e.target.id;
    let price = Number(e.target.value);
    function total(items) {
      let sum = 0;
      Object.keys(items).forEach((item) => {
        if (item != 'total') {
          sum += Number(items[item].price) * Number(items[item].count);
        }
      });
      return sum;
    }
    let newcart = { ...cart };
    console.log(newcart);
    if(newcart[item]){
    newcart[item].price = price;
    newcart[item].count += 1;
    }
    else{
      newcart[item] = {price:price,count:1}
    }
    newcart.total = total(newcart);
    setCart(newcart);
  };

  return filtered.map((item, index) => {
    return (
      <DishCard
        key={item.name + index}
        {...item}
        deleteButton={deleteButton}
        user={user}
        addItemToCart={addItemToCart}
      />
    );
  });
}
