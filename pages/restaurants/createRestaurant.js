import { gql,useQuery } from "@apollo/client";
import React from "react";
import { Input, Form, FormGroup } from "reactstrap";
export default function createRestaurant() {
  const [name, setName] = React.useState("");
  const [description, setDiscription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [dishes, setDishes] = React.useState([]);

  const createForm = async () =>{
    try{
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
    let { loading, error, data } = await useQuery(CREATE_RESTAURANT,
      {variables:{
        "input":{
          "name":name,
          "description":description,
          "image": image
        }}});
       // if (loading) return <p>Loading...</p>;
        //if (error) return <p>ERROR</p>;
        //if (!data) return <p>Not found</p>;
        if(loading) console.log("loading");
        if(error) console.log("ERROR",error);
        if(!data) console.log("!oading");
        else console.log(data);
      }
      catch(e){
        console.log(e);
      }
  }
  return (
    <Form>
      <br></br>
      <FormGroup>
        <Input
          type="text"
          value={name}
          placeholder="Name of restaurant"
          onChange={(e) => {
            setName(e.target.value);
            e.preventDefault();
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => {
            setDiscription(e.target.value);
            e.preventDefault();
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          value={image}
          placeholder="image"
          onChange={(e) => {
            setImage(e.target.value);
            e.preventDefault();
          }}
        />
      </FormGroup>

      <button className="btn btn-primary" onClick={createForm}>create Form</button>
    </Form>
  );
}
