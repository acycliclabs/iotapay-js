class IOTAPAY {

    constructor(options){
        this.init(options)
    }

    init(options){
        console.log('init => options:', options);
        // init IOTA node.
        this.setKey(options.key);
        this.setHost(options.host);
    }

    setKey(key){
        this.key = key;
    }

    setHost(host){
        if(host) {
            this.host = host;
        }
        else {
            this.host = 'constant'
        }
    }

    start() {
        console.log('IOTAPAY is now operational!');
    }

    transfer(address){
        // check if address is valid.
        // transfer
    }

}

module.exports = IOTAPAY
