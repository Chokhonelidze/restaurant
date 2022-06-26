import React from "react";
import { cartContext } from "./context";
import { gql, useQuery, useMutation } from "@apollo/client";
import { DishCard } from "./cards";
import Popup from "./popup";

export default function Cart(){
    const [cart,setCart] = React.useContext(cartContext);
    const [showPopup,setPopup] = React.useState(false);
    let total = 0;
    const addItem = (e) => {
        let item = e.target.value;
        const newCart = {...cart};
        if(newCart[item]){
           
            newCart[item].count +=1;
            newCart.total += newCart[item].price;
        }
        setCart(newCart);
    }
    const removeItem = (e) =>{
        let item = e.target.value;

        if(cart[item]){
            const newCart = {...cart};
            if(newCart[item].count > 1){
                newCart[item].count -= 1;
                newCart.total -= newCart[item].price;
            }
            else {
                newCart.total -= newCart[item].price;
                delete newCart[item];
            }
            setCart(newCart);
        }
    }
    let dishes = [];
    let content =  Object.keys(cart).map((key,index)=>{
        if(key !== 'total'){
            dishes.push(key);
           return <CartItem key={index+"cardItem"} id={key} count={cart[key].count}  addItem={addItem} removeItem={removeItem}/>
        }
        else{
           total = cart[key];
        }
    });
    let closePopup = (e)=>{
        setPopup(false);
    }
    const rest = ()=>{
        total = 0;
        setCart([]);
    }
    return(
    <div className="container">
    <h1>Shopping Cart:</h1>
    <div className="shopingcartBody" >
    {content}
    </div>
    <div>
        <h4>
        total : {total+"$"}
        </h4>
    </div>
    <div>
        <button className="btn btn-primary" onClick={(e)=>{
            setPopup(true);
        }} > Checkout </button>
    </div>
    {showPopup?<Popup total={total} close={closePopup} reset={rest} dishes={dishes} />:''}
    </div>);

}

function CartItem(props) {

    const GET_DISHES = gql`
    query GetDish($input: inputDishes) {
      getDish(input: $input) {
        id
        name
        price
      }
    }
  `;
  let { loading, error, data } = useQuery(GET_DISHES, {
    variables: { input: {id:props.id} },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return <div style={{padding:"5px"}}><DishCard class={'shopping'} {...data.getDish[0]} /><button value={props.id} onClick={props.addItem}>+</button><button value={props.id} onClick={props.removeItem}>-</button> {props.count}</div>
}
 