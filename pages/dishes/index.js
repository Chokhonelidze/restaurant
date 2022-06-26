
import { DishCard } from "../../components/cards";
import React, { useEffect } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { InputGroup,Input, Button } from "reactstrap";
import "../../styles/Home.module.css";
import { cartContext, userContext } from "../../components/context";


export default function dishes(){
    const [search,setSearch] = React.useState('');
    const [cart,setCart] = React.useContext(cartContext);
    const [user,setUser] = React.useContext(userContext);
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
        let { loading, error, data, refresh } = useQuery(GET_DISHES,{variables:{"input":{"search":search,"limit":limit,"offset":offset}}});

        React.useEffect(()=>{
          refresh=true;
        },[]);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>ERROR</p>;
        if (!data) return <p>Not found</p>;
        return data.getDish.map((item,index)=>{
            return <DishCard key={"dish"+index}
            {...item}
            user={user}
            price = {item.price}
            addItemToCart = {addItemToCart}
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
        {user.role === "admin" ? (
        <div key='divCreateDish'>
          <Button color='primary' >
          <Link key="createDish" href="dishes/createDish">
            <a>Create Dish</a>
          </Link>
          </Button>
        </div>
      ) : (
        ""
      )}
        <br></br>
      </div>
      <div className="body">
          <GetAllDishes search={search} limit={100} offset={0} />
      </div>
        </>
    )
}