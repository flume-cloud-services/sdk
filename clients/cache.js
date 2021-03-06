const axios = require('axios')

class Cache {
    constructor(name, address, port) {
        this.name = name
        this.address = address
        this.port = port

        this.instance = axios.create({
            baseURL: `${address}${port ? ':'+port : ''}`,
            timeout: 1000,
            headers: {'Content-Type': 'application/json'}
        })
    }

    async Connect () {
        try {
            const signin = await this.instance.post('/signin', {username: this.name}, {})
            this.instance = axios.create({
                baseURL: `${this.address}${this.port ? ':'+this.port : ''}`,
                timeout: 1000,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${signin.data}`
                }
            })
        } catch (e) {
            console.error(e)
        }
        try {
            const welcome = await this.instance.get('/welcome', {})
            return welcome ? welcome : new Error("Wrong admin name")
        } catch (e) {
            console.error(e)
        }
    }

    async Insert(key, value) {
        try {
            const insert = await this.instance.post('/insert', {key, value})
            return insert.data
        } catch (e) {
            console.error(e)
        }
    }

    async Get(key) {
        try {
            const get = await this.instance.post('/get', {key})
            return get.data
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = Cache