# ElectronicsOrg
A ecommerce app built with react, firebase, express and stripe

The ui was mostly built with plain react with a bit bootstrap here and there. I have also used material icons library extensively.

Tha app was hosted on firebase. It uses email, password authentication and the checkout cart and favorites are stored in firestore databse.
Stripe checkout page was implemented seperately on express server hosted on a different server on heroku. Users are only allowed to chekout using stripe payment page after they verified their email.

The default verification email from firebase sometimes goes in to the spam folder. If i use a custom domain to send emails from this wouldn't happen.

Here's the link to live app: https://electronicsorg-e1ab1.web.app/

Anyways feel free to fork this project and use it.
