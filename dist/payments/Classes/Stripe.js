var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MOWifKEvKjZ4LBEH6ctGv99J51NiIY9Fqhf6opJ6i5YFOBQ1RRHt7lMvR5EHnvsN0evruw1KsyEFTvBUEiiD73b00idMytLiz', {
    apiVersion: '2022-11-15'
});
class StripeAPI {
    constructor() { }
    static fetchPrices(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const prices = yield stripe.prices.list({
                lookup_keys: [key],
                expand: ['data.product']
            });
            return prices;
        });
    }
    static createCheckoutSession(prices) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield stripe.checkout.sessions.create({
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: prices.data[0].id,
                        quantity: 1
                    }
                ],
                mode: 'subscription',
                success_url: 'http://localhost:4242/success',
                cancel_url: 'http://localhost:4242/cancel'
            });
            return session.url;
        });
    }
    static fetchCheckoutSession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkoutSession = yield stripe.checkout.sessions.retrieve(id);
            return checkoutSession;
        });
    }
    static createPortalSession(checkoutSession) {
        return __awaiter(this, void 0, void 0, function* () {
            const portalSession = yield stripe.billingPortal.sessions.create({
                customer: checkoutSession.customer,
                return_url: 'http://localhost:4242/billing-portal-closed'
            });
            return portalSession.url;
        });
    }
}
export default StripeAPI;
