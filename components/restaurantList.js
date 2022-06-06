import Layout from "./layout";
import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import {RestaurantCard} from "./cards";


const GET_RESTAURANTS = gql`
query Restaurants {
  restaurants {
    id
    name
    description
    image
    dishes
  }
}
`;
export default function RestaurantList(props) {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  if(data){
  return data.restaurants.map((items,index) => {
    return <RestaurantCard key={index} {...items} />
  });
}
}
