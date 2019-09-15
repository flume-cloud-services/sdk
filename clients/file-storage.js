const axios = require('axios')

class FileStorage {
    constructor (name, address, port) {
        this.name = name
        this.instance = axios.create({
            baseURL: `${address}${port ? ':'+port : ''}`,
            timeout: 1000,
            headers: {'Content-Type': 'application/json'}
        })
    }

    async Connect () {
        try {
            const signin = await this.instance.post('/signin', {username: name}, {})
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
}

module.exports = FileStorage