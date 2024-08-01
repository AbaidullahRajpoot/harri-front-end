import React, { useEffect } from 'react';
import {
    useAddOrderMutation,
} from "../redux/features/order/orderApi";
import { useRouter } from "next/router";
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

export default function PaymentSuccess({ params }) {
    const [addOrder] = useAddOrderMutation();
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
                }).then((result) => {
                    if (result?.error) {
                        console.error(result.error);
                    } else {
                        localStorage.removeItem('orderInfo');
                        router.push(`/order/${result.data?.order?._id}`);
                    }
                });
            } else {
                console.log('No order data found in local storage');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handlePaymentWithStripe();
    }, []);

    return (
        <LoadingSpinner />
    );
}
