import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import "../styles/index.scss";
import "../styles/LoadingSpinner.css";

// stripePromise
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_Paypal_KEY,
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PayPalScriptProvider options={initialOptions}>
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
      </PayPalScriptProvider>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
