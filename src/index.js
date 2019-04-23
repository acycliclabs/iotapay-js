const Promise = require("bluebird"); // promises
const IOTA = require('iota.lib.js');
const request = require('request');
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
        // this.setHost(options.host);
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
        this.iota = new IOTA({
            provider: this.host
        })
    }

    findHost(callback){
        try {
            request('https://iotapay.dev/api/v1/node', function (error, response, body) {
                if(response.statusCode == 200) {
                    body = JSON.parse(body);
                    callback(null, body.data.host);
                }
                else {
                    console.log('findHost error:', error);
                    callback(null, 'https://potato.iotasalad.org:14265');
                }
            });
        } catch (e) {
            console.log('findHost e:', e);
            callback(null, 'https://potato.iotasalad.org:14265');
        }
    }

    getBalance(addresses, callback) {
        try {
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
        } catch (e) {
            callback(e);
        }
    }

    isWorking() {
        console.log('IOTAPAY is working!');
        return true;
    }

    transfer(requestData, callback){
        try {
            // console.log('requestData:', requestData);
            var message = this.iota.utils.toTrytes(requestData.message);
            // console.log('message:', message);
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

    getTransactionData(hash, callback){
        try {
            let transactionData = {};
            // console.log('requestData:', requestData);
            // console.log('hash:', hash);
            this.iota.api.getBundle(hash, function (err, bundleInfo) {
                try {
                    // console.log('err:', err);
                    // console.log('bundleInfo:', bundleInfo);
                    if(bundleInfo.length > 1) {
                        for (var i = 0; i < bundleInfo.length; i++) {
                            if(bundleInfo[i].value > 0) {
                                transactionData['amount'] = bundleInfo[i].value
                                transactionData['receiver'] = bundleInfo[i].address
                                transactionData['timestamp'] = bundleInfo[i].attachmentTimestamp
                            }
                            else if (bundleInfo[i].value < 0) {
                                transactionData['sender'] = bundleInfo[i].address
                            }
                        }
                        callback(err, transactionData);
                    }
                    else {
                        callback('Can not find the transaction. Please try after sometime!');
                    }
                } catch (e) {
                    callback(err);
                }
            })
        } catch (e) {
            callback(e)
        }
    }

}

module.exports = IOTAPAY
