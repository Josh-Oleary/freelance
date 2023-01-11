var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StripeAPI from './Classes/Stripe.js';
import express from 'express';
const app = express();
const port = 3030;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* eslint-disable @typescript-eslint/no-misused-promises */
// Create checkout session
app.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prices = yield StripeAPI.fetchPrices(req.body.lookupKey);
        console.log('PRICES: ', prices);
        const sessionURL = yield StripeAPI.createCheckoutSession(prices);
        console.log('SESSION URL: ', sessionURL);
        res.redirect(303, sessionURL);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// Create portal session
app.post('/create-portal-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkoutSession = yield StripeAPI.fetchCheckoutSession(req.body.sessionID);
        console.log('CHECKOUT SESSION: ', checkoutSession);
        const portalSessionURL = yield StripeAPI.createPortalSession(checkoutSession);
        console.log('PORTAL SESSION: ', portalSessionURL);
        res.redirect(303, portalSessionURL);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
app.listen(port, () => {
    console.log(`Payment server running on port: ${port}`);
});
/* eslint-disable @typescript-eslint/no-misused-promises */
