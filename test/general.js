var IOTAPAY = require('../src/index')

const iotapay = new IOTAPAY({
    key : '',
    host : 'http://node02.iotatoken.nl:14265'
});

iotapay.start();
