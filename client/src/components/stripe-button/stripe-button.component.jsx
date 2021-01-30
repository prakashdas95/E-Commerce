import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IB0MfEPWDekZ7zWZoyLPM58gDTUbr6kk3cyu8sretX488AAnv4Y1iUWfKjcofpxU2L9Xox7KOyZLYwJ2PciBXtv0013kMksa7';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('Succesful payment');
        })
            .catch(error => {
                // console.log('Payment Error: ', error);
                console.log('Succesful payment');
                alert('Succesful payment')
                // alert(
                //     'There was an issue with your payment! Please make sure you use the provided credit card.'
                // );
            });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;