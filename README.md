# rapidSQL
A very simple and easy to use promise-based MySQL wrapper.

### Installation
1) This library requires **mysql** package. First of all, install it using: `npm install mysql`.

2) Copy the `rapidSQL.js` file to your script's root folder.

### Setting up
```js
const rapidsql = require('./rapidSQL.js');
const db = new rapidsql({host: _YOUR_HOST_, user: _YOUR_USER_, password: _YOUR_PASSWORD, database: _YOUR_DATABASE});
```

Provide the connection data when starting the library. Valid options are:

- `host` (optional): The hostname of the database you are connecting to. (Default `localhost`).
- `user` **(required)**: The MySQL user to authenticate as.
- `password` **(required)**: The password of that MySQL user.
- `database` **(required)**: Name of the database to use for this connection.
- `port` (optional): TThe port number to connect to. (Default `3306`).
- `connectionLimit` (optional): The maximum number of connections to create at once. (Default `10`).
- `stringifyObjects` (optional): Stringify objects instead of converting to values. (Default `false`).
- `debug` (optional): Prints protocol details to stdout. (Default `false`).

### Connecting to the database
This library uses connection pools as default. You only need to connect to the database once. The connection is made asynchronously.

```js
db.connect().then(() => {
    console.log('Successfully connected!');
}).catch((err) => {
    console.log(err);
});
```

### Running SQL queries
You can run SQL queries using the `sql()` function. All queries are made asynchronously and will respond with an object or an array of `RowDataPacket` objects.

```js
db.sql('SELECT * FROM table_name').then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
```
