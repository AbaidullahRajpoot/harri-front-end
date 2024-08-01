import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
//internal import
import { notifyError, notifySuccess } from "@utils/toast";
import { useGetOfferCouponsQuery } from "src/redux/features/coupon/couponApi";
import Loader from "@components/loader/loader";
import { set_coupon } from "src/redux/features/coupon/couponSlice";
import useCartInfo from "./use-cart-info";
import { set_shipping } from "src/redux/features/order/orderSlice";
import {
  useAddOrderMutation,
  useCreatePaymentIntentMutation,
} from "src/redux/features/order/orderApi";

const useCheckoutSubmit = () => {
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  const [addOrder, { }] = useAddOrderMutation();
  const [createPaymentIntent, { }] = useCreatePaymentIntentMutation();
  const { cart_products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { shipping_info } = useSelector((state) => state.order);
  const { total, setTotal } = useCartInfo();
  const [couponInfo, setCouponInfo] = useState({});
  const [cartTotal, setCartTotal] = useState("");
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(20);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
    }
  }, []);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    const result = cart_products?.filter((p) => p.type === discountProductType);
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) =>
        preValue + currentValue.originalPrice * currentValue.orderQuantity,
      0
    );
    let totalValue = "";
    let subTotal = Number((total + shippingCost).toFixed(2));
    let discountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );
    totalValue = Number(subTotal - discountTotal);
    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
    discountAmount,
    cartTotal,
  ]);

  // create payment intent
  useEffect(() => {
    if (cartTotal) {
      createPaymentIntent({
        price: parseInt(cartTotal),
      })
        .then((data) => {
          setClientSecret(data.data.clientSecret);
        })
        .then((error) => {

        });
    }
  }, [createPaymentIntent, cartTotal]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();
    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    if (isLoading) {
      return <Loader loading={isLoading} />;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }
    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode === couponRef.current?.value
    );

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      );
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch(set_coupon(result[0]));
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("country", shipping_info.country);
    setValue("zipCode", shipping_info.zipCode);
    setValue("email", shipping_info.email);
    setValue("contact", shipping_info.contact);
  }, [user, setValue, shipping_info, router]);

  // submitHandler
  const submitHandler = async (data) => {
    console.log(data)
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);
    setLoading(true);
    if (data.PaymentMethod == "stripe") {
      handlePaymentGatewayStripe(data)
    }
    else if (data.PaymentMethod == "paypal") {
      handlePaymentGatewayPaypal(data)
    }
  };

  // submitHandler Paypal
  const handlePaymentGatewayPaypal = async (data) => {

    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      status: "pending",
      cart: cart_products,
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      user: `${user?._id}`
    };
    console.log(orderInfo)
    // PayPal credentials
  const clientId = 'AZJb8CElfp8wxq1RN_UAkg8TVLUv_8KtFQlqM_oCzjJiV4xNdVCaO95iYoASF1NNRrvk3i-S8DEk1wY0';
  const clientSecret = 'EKLNcEXyjcPVm5mypFyRxingdeB8nxu2jNH8cy-RbCuTJs8Iuc1HkjPdKwjfIjRyCB0bV2sQhrcBRnCP';
  // Obtain an OAuth 2.0 token
  const authResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });
  if (!authResponse.ok) {
    const errorData = await authResponse.json();
    console.error('Error fetching OAuth token:', errorData);
    return;
  }
  const authData = await authResponse.json();
  const accessToken = authData.access_token;
  // Create an order
  const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          // items: [
          //   {
          //     name: 'T-Shirt',
          //     description: 'Green XL',
          //     quantity: '1',
          //     unit_amount: {
          //       currency_code: 'USD',
          //       value: orderInfo.totalAmount.toFixed(2),
          //     },
          //   },
          // ],
          amount: {
            currency_code: 'USD',
            value: orderInfo.totalAmount.toFixed(2),
            // breakdown: {
            //   item_total: {
            //     currency_code: 'USD',
            //     value: orderInfo.totalAmount.toFixed(2),
            //   },
            // },
          },
        },
      ],
      application_context: {
        return_url: 'http://localhost:3000/paymentSuccess',
        cancel_url: 'http://localhost:3000/paymentCancel',
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error creating order:', errorData);
    return;
  }

  const rs = await response.json();
  console.log(rs)
  const orderPaymentData = {
    ...orderInfo,
    cardInfo: {
      type:"paypal",
      paymentI:rs.id
    },
  };
   if(rs && rs.links){
    const OrderData = JSON.stringify(orderPaymentData);
    localStorage.setItem('orderInfo', OrderData);
    const redirectUrl=rs.links[1].href
    window.location.href = redirectUrl;
  }

  }

  // submitHandler Stripe
  const handlePaymentGatewayStripe = async (data) => {
    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      status: "pending",
      cart: cart_products,
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      user: `${user?._id}`
    };
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error)
      setCardError(error?.message);
      setIsCheckoutSubmit(false);
    } else {
      setCardError("");
      const orderData = {
        ...orderInfo,
        cardInfo: paymentMethod,
      };
      handlePaymentWithStripe(orderData);
      setIsCheckoutSubmit(false);
      return;
    }
  }

  // handlePaymentWithStripe
  const handlePaymentWithStripe = async (order) => {

    try {
      const { paymentIntent, error: intentErr } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.name,
              email: user?.email,
            },
          },
        });
      if (intentErr) {
        notifyError(intentErr.message);
        setLoading(false);
      } else {
        // notifySuccess("Your payment processed successfully");
      }

      const orderData = {
        ...order,
        paymentIntent,
      };

      addOrder({
        ...orderData,
      })
        .then((result) => {
          if (result?.error) {
            setLoading(false);
          }
          else {
            router.push(`/order/${result.data?.order?._id}`);
            notifySuccess("Your Order Confirmed!");
          }
          if (result.data?.success) {
          }
          setLoading(false);
        })
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    cardError,
    submitHandler,
    stripe,
    handleSubmit,
    clientSecret,
    setClientSecret,
    cartTotal,
    isCheckoutSubmit,
    loading
  };
};

export default useCheckoutSubmit;
