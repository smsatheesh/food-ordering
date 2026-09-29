import MealItem from "./MealItem";
import Error from "./Error";
import useHttp from "../hooks/useHttp";

export default function Meals() {
  const {
    data: mealList,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", null, []);

  if (isLoading) {
    return <p className="center text-italic">Fetching Meals...</p>;
  }

  if (error) {
    return <Error title={"Failed to fetch meals"} message={error} />;
  }
  return (
    <ul id="meals">
      {mealList &&
        mealList.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
}
