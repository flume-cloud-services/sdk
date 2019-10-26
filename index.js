const clients = require('./clients')

class Flume {
    constructor (name, address) {
        this.name = name
        this.address = address
    }

    Database () {
        return new clients.Database(this.name)
    }

    Cache (port = 80) {
        return new clients.Cache(this.name, this.address, port)
    }

    FileStorage (port = 80) {
        return new clients.FileStorage(this.name, this.address, port)
    }
}

module.exports = Flume

/*const FormData = require('form-data')

const flume = new Flume('admin', 'http://localhost')
const fileStorage = flume.FileStorage(5001)
const connection = fileStorage.Connect()
connection.then(response => {
    console.log(response.data)
    let data = new FormData()
    data.append('file', "Hello world !", 'hello.txt')
    const fileUpload = fileStorage.PostFile(data)
    fileUpload.then(response => console.log(response))
})*/

/*const flume = new Flume('admin', 'http://localhost')
cache = flume.Cache(5002)
connection = cache.Connect()
connection.then(() => cache.Insert('hello', 'world'))
.then(response => console.log(response))
.then(() => cache.Get('hello'))
.then(response => console.log(response))*/