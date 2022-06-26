import { gql, useMutation } from "@apollo/client";
import { useRouter,Router } from "next/router";
import {useContext,useState, useEffect} from "react";
import { FormBuilder } from "../../components/formBuilder";
import { userContext } from "../../components/context";
export default function createDish() {
  const [user, setUser] = useContext(userContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [status,setStatus] = useState("");
  useEffect(()=>{
    if(!user){
      let ref=()=>{
        console.log("here")
        window.location.href = '/';
      }
      ref();
    }
  },[]);
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

  const createDish = async () => {
    if (name && description && price && image) {
      let response = await DishQuery({
        variables: {
          input: {
            name: name,
            description: description,
            image: image,
            price: Number(price),
          },
        },
      }).then(()=>{
          console.log(response);
          setStatus("Success Dish has been created");
          setName("");
          setDescription("");
          setPrice("");
          setImage("");
    });
    }
  };


  let formBuilderData = {
    "Dish Name": [name, setName],
    "Dish Description": [description, setDescription],
    "Dish Image": [image, setImage],
    "Dish Price": [price, setPrice],
    "Add Dish To Restaurant": ["", createDish],
  };
  return (
    <>
      <h2>Add Dishes Information</h2>
      <FormBuilder {...formBuilderData} />
      <h3 className="text-success">{status}</h3>
    </>
  );
}
