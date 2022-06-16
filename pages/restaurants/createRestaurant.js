import { gql, useMutation } from "@apollo/client";
import React from "react";
import {FormBuilder} from "../../components/formBuilder";
import Dish from "../../components/dish";
export default function createRestaurant() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [dishes, setDishes] = React.useState([]);
  const [addDish,setAddDish] = React.useState(false);
  const CREATE_RESTAURANT = gql`
    mutation CreateRestaurant($input: createRestaurant) {
      createRestaurant(input: $input) {
        id
        name
        description
        image
      }
    }
  `;
  const [createRestaurant] = useMutation(CREATE_RESTAURANT);

  const submit=()=>{
    if(name,description,image)
      createForm();
    else{
      console.log(name,description,image);
    }
  }

  async function createForm() {
    let response = await createRestaurant({
      variables: {
        input: {
          name: name,
          description: description,
          image: image,
        },
      },
    });
    console.log(response);
    if (response.data.createRestaurant) {
    }
  }
  let formBuilderData = {
    "Restaurant Name":[name,setName],
    "Restaurant Description":[description,setDescription],
    "Image":[image,setImage],
    "Create Restaurant":['',submit]
  }
  return (
    <>
    <h2>Create New Restaurant</h2>
    <FormBuilder {...formBuilderData} />
    {addDish?
     <Dish  handleDish={(id)=>{
       setAddDish(false);
       setDishes([...dishes,id]);
     }}/>
     :
     <button onClick={()=>{
      setAddDish(true);
     }}>+ Dish</button>
    }
   
    </>
  );
}
