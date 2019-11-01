const axios = require('axios')

class Database {
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

    async Connect() {
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

    async Create(name) {
        try {
            const create = await this.instance.post('/database/create', {name})
            return create.data
        } catch (e) {
            console.error(e)
        }
    }

    async Delete(name) {
        try {
            const deleter = await this.instance.post('/database/delete', {name})
            return deleter.data
        } catch (e) {
            console.error(e)
        }
    }

    async Insert(database, query, content) {
        try {
            const insert = await this.instance.post('/insert', {database, query, content})
            return insert.data
        } catch (e) {
            console.error(e)
        }
    }

    async Query(database, query) {
        try {
            const post = await this.instance.post('/query', {database, query})
            return post.data
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = Database