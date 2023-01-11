import StripeAPI from './Classes/Stripe.js'
import express, { Express, Request, Response } from 'express'
const app: Express = express()

const port: number = 3030

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* eslint-disable @typescript-eslint/no-misused-promises */

// Create checkout session
app.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const prices = await StripeAPI.fetchPrices(req.body.lookupKey)
    console.log('PRICES: ', prices)
    const sessionURL = await StripeAPI.createCheckoutSession(prices)
    console.log('SESSION URL: ', sessionURL)
    res.redirect(303, sessionURL)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// Create portal session
app.post('/create-portal-session', async (req: Request, res: Response) => {
  try {
    const checkoutSession = await StripeAPI.fetchCheckoutSession(req.body.sessionID)
    console.log('CHECKOUT SESSION: ', checkoutSession)
    const portalSessionURL = await StripeAPI.createPortalSession(checkoutSession)
    console.log('PORTAL SESSION: ', portalSessionURL)
    res.redirect(303, portalSessionURL)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

app.listen(port, () => {
    console.log(`Payment server running on port: ${port}`)
})

/* eslint-disable @typescript-eslint/no-misused-promises */
