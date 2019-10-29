import React from 'react';

//alternative library https://tipsi.github.io/tipsi-stripe/docs/usage.html
Stripe.int({
    publishableKey: 'pk_',
});

Stripe.createTokenWithCard({
    number: '4111 1111 1111 1111',
    cvc: '123',
    expMonth: 11,
    expYear: 22,
}).then(res => {
    console.log(res.token);
});
