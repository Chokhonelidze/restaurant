import React from "react";
import { FormBuilder } from "./formBuilder";
import { gql, useMutation } from "@apollo/client";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

export default function Dish(props) {
    const [name,setName] = React.useState(props.name);
    const [description,setDescription] = React.useState(props.description);
    const [price,setPrice] = React.useState(props.price);
    const [image,setImage] = React.useState(props.image);

    const CREATE_DISH = gql`
    mutation Mutation($input: createDish) {
        createDish(input: $input) {
          name
          description
          image
          price
        }
      }      
  `;
  const [DishQuery] = useMutation(CREATE_DISH);
  

    const createDish =async ()=>{
        if(name&&description&&price&&image){
        let response = await DishQuery({
            variables: {
                input:{
                    name:name,
                    description:description,
                    image:image,    
                    price:Number(price)
                }
            }
        }).then(console.log(response));
        
        console.log(response);
        if(props.handleDish)props.handleDish(response.data.id);
        }
        else {
            console.log(name,description,image,price);
        }
    }
    let formBuilderData = {
        "Dish Name":[name,setName],
        "Dish Description":[description,setDescription],
        "Dish Image":[image,setImage],
        "Dish Price":[price,setPrice],
        "Add Dish To Restaurant":['',createDish]
      }
    return(
        <>
        <h2>Add Dishes Information</h2>
        <FormBuilder {...formBuilderData} />
        </>
    );


}