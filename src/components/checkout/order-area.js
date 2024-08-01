import React, { useState } from "react";
import { useSelector } from "react-redux";
// internal
import OrderDetails from "./order-details";
import PaymentCardElement from "@components/order/pay-card-element";
import OrderSingleCartItem from "./order-single-cart-item";
import { PayPalButtons } from "@paypal/react-paypal-js";

const OrderArea = ({
  stripe,
  error,
  register,
  errors,
  discountAmount,
  shippingCost,
  cartTotal,
  handleShippingCost,
  setClientSecret,
  isCheckoutSubmit,
}) => {
  const { cart_products } = useSelector((state) => state.cart);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');

  const handleRadioChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  return (
    <div className="your-order mb-30 ">
      <h3>Your order</h3>
      <div className="your-order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-total text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart_products?.map((item, i) => (
              <OrderSingleCartItem
                key={i}
                title={item.title}
                quantity={item.quantity}
                price={item.originalPrice}
              />
            ))}
          </tbody>
          <tfoot>
            <OrderDetails
              register={register}
              errors={errors}
              discountAmount={discountAmount}
              cartTotal={cartTotal}
              shippingCost={shippingCost}
              handleShippingCost={handleShippingCost}
              setClientSecret={setClientSecret}
            />
          </tfoot>
        </table>
      </div>
      {/* <div className="payment-method faq__wrapper tp-accordion">
        <div className="accordion" id="checkoutAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="checkoutOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#bankOne"
                aria-expanded="true"
                aria-controls="bankOne"
              >
                Pay With Card
                <span className="accordion-btn"></span>
              </button>
            </h2>
            <div
              id="bankOne"
              className="accordion-collapse collapse show"
              aria-labelledby="checkoutOne"
              data-bs-parent="#checkoutAccordion"
            >
              <div className="accordion-body">
                <PaymentCardElement
                  stripe={stripe}
                  cardError={error}
                  cart_products={cart_products}
                  isCheckoutSubmit={isCheckoutSubmit}
                />
              </div>

            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="checkoutTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Pay With Paypal
                <span className="accordion-btn"></span>
              </button>
            </h2>
            <div id="collapseOne"
              className="accordion-collapse collapse "
              aria-labelledby="checkoutTwo"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <PayPalButtons
                    style={{ color: "blue" }}
                    createOrder={createOrder}
                    fundingSource="paypal"
                  />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="d-flex justify-content-between">
        <div className="product-name">
          <h5 className="fw-bold"> Select Payment method</h5>
        </div>
        <div className="d-flex">
          <div>
            <input
              {...register(`PaymentMethod`, {
                required: `PaymentMethod Option is required!`,
              })}
              type="radio"
              id="stripe"
              name="PaymentMethod"
              value="stripe"
              checked={selectedPaymentType === 'stripe'}
              onChange={handleRadioChange}
            />
            <label htmlFor="stripe">Stripe</label>
          </div >
          <div className="ml-10">
            <input
              {...register(`PaymentMethod`, {
                required: `PaymentMethod Option is required!`,
              })}
              type="radio"
              id="paypal"
              name="PaymentMethod"
              value="paypal"
              checked={selectedPaymentType === 'paypal'}
              onChange={handleRadioChange}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
      </div>
      {selectedPaymentType === 'stripe' && (
        <div className="mt-20">
          <div
            id="bankOne"
            className="accordion-collapse collapse show"
            aria-labelledby="checkoutOne"
            data-bs-parent="#checkoutAccordion"
          >
            <div className="accordion-body">
              <PaymentCardElement
                stripe={stripe}
                cardError={error}
                cart_products={cart_products}
                isCheckoutSubmit={isCheckoutSubmit}
              />
            </div>

          </div>
        </div>
      )}
      {selectedPaymentType === 'paypal' && (
        <div className="mt-20">
          <div
            id="bankOne"
            className="accordion-collapse collapse show"
            aria-labelledby="checkoutOne"
            data-bs-parent="#checkoutAccordion"
          >
            <div className="accordion-body">
              <div className="order-button-payment mt-25">

                <button
                  type="submit"
                  data-payment-type="stripe"
                  className="tp-btn"
                  disabled={!stripe || cart_products.length === 0 || isCheckoutSubmit}
                >
                  Paypal
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default OrderArea;
