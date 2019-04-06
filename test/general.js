var IOTAPAY = require('../src/index');

const iotapay = new IOTAPAY({
    host : 'https://potato.iotasalad.org:14265'
});

// iotapay.isWorking();

// iotapay.getBalance([''], function (err, balance) {
    if(err) {
        console.log('error:', err);
    }
    console.log('balance:', balance);
})

iotapay.transfer({
    'address': '',
    'value': '0',
    'message': 'Testing',
    'seed': ''
}, function (err, result) {
    if(err) {
        console.log('error:', err);
    }
    console.log('result:', result);
})
