# IOTAPAY

![GitHub package.json version](https://img.shields.io/github/package-json/v/acycliclabs/iotapay-js.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![node](https://img.shields.io/node/v/iotapay.svg) ![npm](https://img.shields.io/npm/dt/iotapay.svg)


NodeJs library to Pay using IOTA

# Setup

Install the library `npm install iotapay`

Import package: `require('iotapay');`

Initialize:
```
new IOTAPAY({
    host : 'http://node06.iotatoken.nl:14265'
});
```

## Basic functions

### Get Balance.

Initialize:
```
const iotapay = new IOTAPAY({
    host : 'http://node06.iotatoken.nl:14265'
});
```

Retreive Balance:
```
iotapay.getBalance(['ADDRESS'], function (err, balance) {
    if(err) {
        console.log('error:', err);
    }
    console.log('balance:', balance);
})
```

### Pay

```
iotapay.transfer({
    address: 'ADDRESS',
    value: 1,
    message: 'Testing',
    seed: 'SEED'
}, function (err, result) {
    if(err) {
        console.log('error:', err);
    }
    console.log('result:', result);
})
```

Result gives bundle hash.

#### More Functions coming soon.

NOTE: Please, use proper iota node url, ADDRESS and your SEED to initialise. These are simple dummy values. NOT meant for production usage.
