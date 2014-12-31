module.exports = {

    port: process.env.PORT || 3000,

    db: process.env.MONGOLAB_URI || process.env.MONGODB || 'mongodb://localhost:27017/sites',

    sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

    stripe: {
        secretKey: process.env.STRIPE_SKEY || 'sk_test_BQokikJOvBiI2HlWgH4olfQ2',
        publishableKey: process.env.STRIPE_PKEY || 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
    }
};