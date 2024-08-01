import React, { useEffect } from 'react'
import {
    useAddOrderMutation,
    useCreatePaymentIntentMutation,
} from "../redux/features/order/orderApi";
import { useRouter } from "next/router";
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
export default function paymentSuccess({ params }) {
    const [addOrder, { }] = useAddOrderMutation();
    const router = useRouter();

    const handlePaymentWithStripe = async () => {
             try {
            const orderInfoString = localStorage.getItem('orderInfo');
            if (orderInfoString) {
                const order = JSON.parse(orderInfoString);
                const orderData = {
                    ...order,
                    paymentIntent: null,
                };

                addOrder({
                    ...orderData,
                })
                    .then((result) => {
                        if (result?.error) {

                        }
                        else {
                            localStorage.removeItem('orderInfo');
                            router.push(`/order/${result.data?.order?._id}`);
                        }
                        if (result.data?.success) {
                        }

                    })
            } else {
                console.log('No order data found in local storage');

            }
        } catch (err) {
            console.log(err);

        }
    };
    useEffect(() => {
        handlePaymentWithStripe()
    }, [])
    return (
        <LoadingSpinner />
    )
}
