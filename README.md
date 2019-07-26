# [IOTAPAY](https://iotapay.dev/)

[![GitHub package.json version](https://img.shields.io/github/package-json/v/acycliclabs/iotapay-js.svg)](https://github.com/acycliclabs/iotapay-js/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![node](https://img.shields.io/badge/node-%3E%3D8.9.4-brightgreen.svg)](https://nodejs.org/download/release/v8.9.4/)
[![npm](https://img.shields.io/npm/dt/iotapay.svg)](https://www.npmjs.com/package/iotapay)
[![Dependency Status](https://img.shields.io/david/acycliclabs/iotapay-js.svg)](https://david-dm.org/acycliclabs/iotapay-js)
[![DevDependency Status](https://img.shields.io/david/acycliclabs/iotapay-js.svg?label=devDependencies)](https://david-dm.org/acycliclabs/iotapay-js?type=dev)

[![NPM](https://nodei.co/npm/iotapay.png)](https://nodei.co/npm/iotapay/)

[![Join Discord](https://img.shields.io/discord/417944032111493152?logo=discord&label=join%20discord")](https://discord.gg/vg92AZn)
[![Follow on Twitter](https://img.shields.io/twitter/follow/acycliclabs?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=acycliclabs)

[NodeJs](https://nodejs.org/) library to Pay using IOTA

# Setup

Install the library `npm install iotapay`

Import package: `require('iotapay');`

Initialize:
```
new IOTAPAY({
    host : 'http://node06.iotatoken.nl:14265'
});
```

***

## Basic functions

<details><summary>Initialize:</summary>
<p>

#### Initialize the iotapay object.

```javascript
const iotapay = new IOTAPAY();
```

Set Host manually like this:

```javascript
iotapay.setHost('http://node06.iotatoken.nl:14265');
```

or we will find a suitable host for you like this:

```javascript
iotapay.findHost(function (err, host) {
    if(err) {
        console.log('error:', err);
    }    
    iotapay.setHost(host);
})
```

</p>
</details>

***

<details><summary>Get Balance:</summary>
<p>

#### Retrieve Balance

```javascript
iotapay.getBalance(['ADDRESS'], function (err, balance) {
    if(err) {
        console.log('error:', err);
    }
    console.log('balance:', balance);
})
```

</p>
</details>

***

<details><summary>Pay:</summary>
<p>

#### Transfer iota as payment.

```javascript
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

</p>
</details>

***

#### More Functions coming soon.

NOTE: Please, use proper iota node url, ADDRESS and your SEED to initialise. These are simple dummy values. NOT meant for production usage.
