import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51IB0MfEPWDekZ7zWZoyLPM58gDTUbr6kk3cyu8sretX488AAnv4Y1iUWfKjcofpxU2L9Xox7KOyZLYwJ2PciBXtv0013kMksa7';
    const onToKen = token => {
        console.log(token);
        alert("Payment Successful");
    }

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
            token={onToKen}
            stripeKey={publishablekey}
        />
    )
};

export default StripeCheckoutButton;