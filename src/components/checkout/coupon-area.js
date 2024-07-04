import React, { useState } from "react";
// internal
import CouponForm from "@components/forms/coupon-form";
import LoginForm from "@components/forms/login-form";

const CouponArea = (props) => {
  const [checkoutLogin, setCheckoutLogin] = useState(false);
  const [checkoutCoupon, setCheckoutCoupon] = useState(false);
  return (
    <section className="coupon-area pt-120 pb-30">
      <div className="container">
        <div className="row">
        
          <div className="col-md-12">
            <div className="coupon-accordion">
              <h3>
                Have a coupon?{" "}
                <span
                  onClick={() => setCheckoutCoupon(!checkoutCoupon)}
                  id="showcoupon"
                >
                  Click here to enter your code
                </span>
              </h3>
              {checkoutCoupon && (
                <div id="checkout_coupon" className="coupon-checkout-content">
                  <div className="coupon-info">
                    {/* info form start */}
                    <CouponForm {...props} />
                    {/* info form end */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponArea;
