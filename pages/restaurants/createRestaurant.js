import { gql, useMutation } from "@apollo/client";
import React from "react";
import {FormBuilder} from "../../components/formBuilder";
import {userContext} from "../../components/context";
export default function createRestaurant() {
  const [user,setUser] = React.useContext(userContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");

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
    let header = "";
    let response = await createRestaurant({
      variables: {
        input: {
          name: name,
          description: description,
          image: image,
        }
      },
    });
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
    </>
  );
}
