import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51MOWifKEvKjZ4LBEH6ctGv99J51NiIY9Fqhf6opJ6i5YFOBQ1RRHt7lMvR5EHnvsN0evruw1KsyEFTvBUEiiD73b00idMytLiz', {
  apiVersion: '2022-11-15'
})

class StripeAPI {
  constructor () {}

  static async fetchPrices (key: string): Promise<any> {
    const prices = await stripe.prices.list({
      lookup_keys: [key],
      expand: ['data.product']
    })
    return prices
  }

  static async createCheckoutSession (prices: any): Promise<any> {
    const session = await stripe.checkout.sessions.create({
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
    })

    return session.url
  }

  static async fetchCheckoutSession (id: string): Promise<any> {
    const checkoutSession = await stripe.checkout.sessions.retrieve(id)

    return checkoutSession
  }

  static async createPortalSession (checkoutSession: any): Promise<any> {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: 'http://localhost:4242/billing-portal-closed'
    })

    return portalSession.url
  }
}

export default StripeAPI
