import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../redux/feature/cartSlice";
import { useState } from "react";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState(false);

  const getPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? 0 : num;
  };

  const subtotal = cartItems.reduce((sum, i) => sum + getPrice(i.price) * i.quantity, 0);

  if (checkout) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order 🎉</h1>
        <p className="text-lg">Your payment of <span className="font-semibold">${subtotal.toFixed(2)}</span> was successful.</p>
        <button
          onClick={() => { setCheckout(false); dispatch(clearCart()); }}
          className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <img src={item.image_url} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">${getPrice(item.price).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-3 py-1 border rounded" onClick={() => dispatch(decreaseQty(item.id))}>-</button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button className="px-3 py-1 border rounded" onClick={() => dispatch(increaseQty(item.id))}>+</button>
            </div>

            <div className="text-right">
              <p className="font-semibold">${(getPrice(item.price) * item.quantity).toFixed(2)}</p>
              <button
                className="text-red-600 text-sm hover:underline mt-1"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => dispatch(clearCart())}
          className="px-5 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          Clear Cart
        </button>

        <div className="text-right">
          <p className="text-lg">
            Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </p>
          <button
            onClick={() => setCheckout(true)}
            className="mt-3 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
