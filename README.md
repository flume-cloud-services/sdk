<p align="center">
  <img src="https://raw.githubusercontent.com/dimensi0n/flume/master/.github/logo.png" width="400"/>
</p>

<hr>

# SDK

The javascript library which makes it easier to use Flume-Cloud-Services

## Usage

* Database

```js
// Create a Flume Instance
const flume = new Flume('admin', 'http://localhost')

// Create the Cache instance with a specific port (leave it blank if there is no specific port)
const database = flume.Database(6001)

// Connect to the distant Daabase Service
const connection = database.Connect()

connection.then(() => database.Create('database')) // Create a database called 'database'
.then(() => database.Insert('database', 'users.0.name', 'John Doe')) // Insert into the database called 'database', 'John Doe' for the first user's name
.then(response => console.log(response)) // 'Data successfully inserted'
.then(() => database.Query('database', 'users.0.name')) // Get the first user's name in the database called 'database'
.then(response => console.log(response)) // 'John Doe'
```

* Cache

```js
// Create a Flume Instance
const flume = new Flume('admin', 'http://localhost')

// Create the Cache instance with a specific port (leave it blank if there is no specific port)
cache = flume.Cache(5002)

// Connect to the distant File Storage Service
connection = cache.Connect()

// Insert key 'hello' with value 'world'
connection.then(() => cache.Insert('hello', 'world'))
.then(response => console.log(response))
.then(() => cache.Get('hello')) // Get 'hello' key
.then(response => console.log(response))
```

* File-Storage

```js
// Create a Flume Instance
const flume = new Flume('admin', 'http://localhost')

// Create the File Storage instance with a specific port (leave it blank if there is no specific port)
const fileStorage = flume.FileStorage(5001)

// Connect to the distant File Storage Service
const connection = fileStorage.Connect()
connection.then(() => {

    // Add file to form
    let data = new FormData()
    data.append('file', "This is a file !", 'hello.txt')

    // Post the form
    const fileUpload = fileStorage.PostFile(data)

    // You will get the filename to access it
    fileUpload.then(response => console.log(response))
})
```
