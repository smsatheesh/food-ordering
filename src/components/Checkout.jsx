import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartContext.items?.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCheckoutClose() {
    userProgressContext.hideCheckOut();
  }

  function handleFinish() {
    cartContext.clearCartItems();
    clearData();
    userProgressContext.hideCheckOut();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    );
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Order placed successfully!!</p>

        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay!</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressContext.progress === "checkout"}
      onClose={handleCheckoutClose}
    >
      <form className="control" onSubmit={handleSubmit}>
        {error && <Error title={"Failed to submit order!"} message={error} />}

        <h2>Checkout Page</h2>
        <p> Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          {!isSending ? (
            <>
              <Button textOnly onClick={handleCheckoutClose}>
                Close
              </Button>

              <Button type="submit">Submit Order</Button>
            </>
          ) : (
            <span>Sending order data ....</span>
          )}
        </p>
      </form>
    </Modal>
  );
}
