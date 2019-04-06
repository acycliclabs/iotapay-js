const Promise = require("bluebird") // promises
const IOTA = require('iota.lib.js')
// const bAES = require('browserify-aes')
// const Mam = require('mam.client.js')
// const Mam = require('./mam.node.js')
// const Converter = require('@iota/converter')


class IOTAPAY {

    constructor(options){
        this.init(options)
    }

    init(options){
        // console.log('init => options:', options);
        // init IOTA node.
        // this.setSeed(options.seed);
        this.setHost(options.host);
        this.iota = new IOTA({
            provider: options.host
        })
        // console.log('iota:', iota);
    }

    setSeed(seed){
        this.seed = seed;
    }

    setHost(host){
        if(host) {
            this.host = host;
        }
        else {
            this.host = 'https://potato.iotasalad.org:14265'
        }
    }

    getBalance(addresses, callback) {
        this.iota.api.getBalances(addresses, 100, function(error, inputs) {
            var i = 0;
            var totalValue = 0;
            if(inputs != null && inputs.balances != null) {
                inputs.balances.forEach(function(balance) {
                    // console.log('balance ', i,':', balance);
                    totalValue += parseInt(balance);
                    i++
                })
            } else {
                // console.log(error);
                callback(error);
            }
            callback(null, totalValue);
        });
    }

    isWorking() {
        console.log('IOTAPAY is working!');
        return true;
    }

    transfer(requestData, callback){
        try {
            console.log('requestData:', requestData);
            var message = this.iota.utils.toTrytes(requestData.message);
            console.log('message:', message);
            var transfers = [
                {
                    value: requestData.value,
                    address: requestData.address,
                    message: message
                }
            ]
            let depth = 3
            let minWeightMagnitude = 14
            this.iota.api.sendTransfer(requestData.seed, depth, minWeightMagnitude, transfers, (error, success) => {
                if (error) {
                    // console.log('error in sendTransfer:', error)
                    callback(error);
                } else {
                    console.log('success:', success);
                    callback(null, success[0].bundle);
                }
            });
        } catch (e) {
            callback(e)
        }
    }

}

module.exports = IOTAPAY
