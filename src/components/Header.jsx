import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const totalItemsInCart =
    cartContext.items?.reduce((totalItems, item) => {
      return totalItems + item.quantity;
    }, 0) ?? 0;

  function handleShowCart() {
    userProgressContext.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Restaurant Logo" />
        <h1>Restaurant Booking</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart {totalItemsInCart}
        </Button>
      </nav>
    </header>
  );
}
