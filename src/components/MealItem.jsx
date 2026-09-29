import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const cartContext = useContext(CartContext);

  function handleAddToCart() {
    cartContext.addItem(meal);
  }

  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt={`${meal.name} image`}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>

          <p className="meal-item-actions">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}
