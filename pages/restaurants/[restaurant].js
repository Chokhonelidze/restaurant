import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { gql, useQuery,useMutation } from "@apollo/client";
import client from "../../apollo/apolloClient";
import { userContext } from "../../components/context";
import { FormBuilder } from "../../components/formBuilder";
import {ExistingCards} from "../../components/showDishCard";
import DishSelector from "../../components/dishSelector";

import React from "react";
import { Button } from "reactstrap";

export default function Restaurant() {
  const router = useRouter();
  const [user, setUser] = React.useContext(userContext);
  const [edit, setEdit] = React.useState(false);

  const query = gql`
    query Restaurants($input: restaurantQueryInput) {
      restaurants(input: $input) {
        id
        name
        description
        image
        dishes
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: { input: { id: router.query.restaurant } },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  let restaurant = data.restaurants[0];
  return (
    <>
     {user.role === 'admin'?
      <button
        onClick={(e) => {
          if (edit) setEdit(false);
          else setEdit(true);
        }}
      >
        ⚙️
      </button>:''
    }
   
      {edit ? (
        <>
        <Form {...restaurant} />
        <ExistingCards {...restaurant} />
        </>
      ) : (
        <div>
          <h1>{restaurant.name}</h1>
          <img className="bigImg" src={restaurant.image} />
          <h2>{restaurant.description}</h2>
          <ExistingCards {...restaurant} />
        </div>
      )}
    </>
  );
}

function Form(props) {

  const [name, setName] = React.useState(props.name);
  const [description, setDescription] = React.useState(props.description);
  const [image, setImage] = React.useState(props.image);
  const [dishes, setDishes] = React.useState(props.dishes);
  const [addDish,setAddDish] = React.useState(false);
  const query = gql`
  mutation UpdateRestaurant($input: updateRestaurant) {
    updateRestaurant(input: $input) {
      id
      name
      description
      image
      dishes
    }
  }
  `;
  const [updateRestaurant] = useMutation(query);
  const submit = (e) => {
    
    let response = updateRestaurant({
      variables: {
        input: {
          id: Number(props.id),
          name:name,
          description:description,
          image:image,
          dishes:dishes
        }
      }
    });
    
    console.log(response);

  };
  let formBuilderData = {
    "Restaurant Name": [name, setName],
    "Restaurant Description": [description, setDescription],
    Image: [image, setImage],
  };
 
  
  
  return (
    <>
      <h2>Restaurant {name}</h2>
      <Button color="primary" onClick={submit} >Save</Button>
      <FormBuilder {...formBuilderData} />
      <Button  onClick={(e)=>{
        if(addDish)setAddDish(false);
        else setAddDish(true);
        }}> Add New Dish </Button>
      {addDish?<DishSelector setDishes={setDishes}  dishes={dishes} />:''}
    </>
  );
}
