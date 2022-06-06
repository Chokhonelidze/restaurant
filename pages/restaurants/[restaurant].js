import {useRouter} from "next/router";
import styles from '../../styles/Home.module.css'
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo/apolloClient";

export default function Restaurant() {
  const router = useRouter();
  const query = gql`
  query Restaurants($input: restaurantQueryInput) {
    restaurants(input: $input) {
      id
      name
      description
      image
      dishes
    }
  }`;
  const { loading, error, data } = useQuery(query,{variables:{"input":{"id":router.query.restaurant}}});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  let restaurant = data.restaurants[0];
  console.log(restaurant);
  return (
    <div>
      <h1>{restaurant.name}</h1>
      <h2>{restaurant.description}</h2>
    </div>
  )
}
