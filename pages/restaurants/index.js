
import { RestaurantCard } from "../../components/cards";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Restaurant({search}) {
    console.log(search);
    const GET_RESTAURANTS = gql`
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
    let { loading, error, data } = useQuery(GET_RESTAURANTS,{variables:{"input":{"search":search}}});

   
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    if(data){
    return data.restaurants.map((items,index) => {
      return (
          <>
          <Link as={"/restaurants/"+items.id} href="restaurants/[restaurant]">
           <a><RestaurantCard key={index} {...items} /></a>
           </Link>
           </>
      );
    });
    }
}