# ElectronicsOrg
A ecommerce app built with react, firebase, express and stripe

The ui was mostly built with plain react with a bit bootstrap here and there. I have also used material icons library extensively.

The app was hosted on firebase. It uses email, password authentication and the checkout cart and favorites are stored in Firestore database. Stripe checkout page was implemented separately on express server hosted on a different server on Heroku. Users are only allowed to checkout using stripe payment page after they verified their email.

The default verification email from firebase sometimes goes in to the spam folder. If i use a custom domain to send emails from this wouldn't happen.

Here's the link to live app: https://electronicsorg-e1ab1.web.app/
