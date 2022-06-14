import { RestaurantCard } from "../../components/cards";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import "../../styles/Home.module.css";

export default function Restaurant({ search }) {
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
  let { loading, error, data } = useQuery(GET_RESTAURANTS, {
    variables: { input: { search: search, limit: 200 } },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return data.restaurants.map((items, index) => {
    return (
      <div key={"div" + index}>
        <Link
          key={"link" + index}
          as={"/restaurants/" + items.id}
          href="restaurants/[restaurant]"
        >
          <a>
            <RestaurantCard key={"restaurant" + index} {...items} />
          </a>
        </Link>
      </div>
    );
  });
}
