# rapidSQL
A very simple and easy to use promise-based MySQL wrapper for Node.js.

### Installation
```
npm install @eugabrielsilva/rapidsql
```

### Setting up
```js
const rapidSQL = require('@eugabrielsilva/rapidsql');
const db = new rapidSQL({host: _YOUR_HOST_, user: _YOUR_USER_, password: _YOUR_PASSWORD, database: _YOUR_DATABASE});
```

Provide the connection options as an object in the database constructor. Valid options are:

- `host` (optional): The hostname of the database you are connecting to. (Defaults to `localhost`)
- `user` **(required)**: The MySQL user to authenticate as.
- `password` **(required)**: The password of that MySQL user.
- `database` **(required)**: Name of the database to use for this connection.
- `port` (optional): TThe port number to connect to. (Defaults to `3306`)
- `connectionLimit` (optional): The maximum number of connections to create at once. (Defaults to `10`)
- `stringifyObjects` (optional): Stringify objects instead of converting to values. (Defaults to `false`)
- `debug` (optional): Prints protocol details to stdout. (Defaults to `false`)

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
You can run SQL queries by using the `sql()` function. All queries are made asynchronously and will respond with a result object or an array of objects.

```js
db.sql('SELECT * FROM table_name').then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
```

#### Escaping query values
**Caution!** These methods of escaping values only works when the `NO_BACKSLASH_ESCAPES` SQL mode is disabled (which is the default state for MySQL servers).

In order to avoid SQL Injection attacks, you should always escape any user provided data before using it inside a SQL query. You can do this by using `?` characters as placeholders for values you would like to have escaped like this:

```js
var userID = 5;
db.sql('SELECT * FROM users WHERE ID = ?', [userID]).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
```

Multiple placeholders are mapped to values in the same order as passed. For example, in the following query `foo` equals `a`, `bar` equals `b`, `baz` equals `c`, and `ID` will be `userID`:

```js
var userID = 5;
db.sql('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE ID = ?', ['a', 'b', 'c', userID]).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
```

### Closing the connection
If you are not going to use the connection anymore, you can close it by using the `close()` function. This function will wait until all pending queries are executed.

```js
db.close().then(() => {
    console.log('Successfully disconnected!');
}).catch((err) => {
    console.log(err);
});
```
