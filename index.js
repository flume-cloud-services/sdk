const { Cache, Database, FileStorage } = require('./clients')

class Flume {
    constructor (name, address) {
        this.name = name
        this.address = address
    }

    Database () {
        return new Database(this.name)
    }

    Cache () {
        return new Cache(this.name)
    }

    FileStorage (port) {
        return new FileStorage(this.name, this.address, port)
    }
}

const flume = new Flume('admin', 'http://localhost')
const test = await flume.FileStorage(5001).Connect()
console.log(test)