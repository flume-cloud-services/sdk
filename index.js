const clients = require('./clients')

class Flume {
    constructor (name, address) {
        this.name = name
        this.address = address
    }

    Database () {
        return new clients.Database(this.name)
    }

    Cache () {
        return new clients.Cache(this.name)
    }

    FileStorage (port) {
        return new clients.FileStorage(this.name, this.address, port)
    }
}

const flume = new Flume('admin', 'http://localhost')
const test = flume.FileStorage(5001).Connect()
test.then(response => console.log(response))