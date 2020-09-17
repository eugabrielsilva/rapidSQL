const mysql = require('mysql');

class Database{
    pool = null;
    conData = null;

    constructor({host='localhost', user, password, database, port=3306, connectionLimit=10, stringifyObjects=false, debug=false}){
        if(!user) throw 'Please provide a user!';
        if(!password) throw 'Please provide a password!';
        if(!database) throw 'Please provide a database!';
        this.conData = {
            host: host,
            user: user,
            password: password,
            database: database,
            port: port,
            connectionLimit: connectionLimit,
            stringifyObjects: stringifyObjects,
            debug: debug,
            supportBigNumbers: true,
            multipleStatements: true
        };
    };

    /**
     * Establishes an asynchronous connection to the database.
     */
    connect(){
        return new Promise((resolve, reject) => {
            if(!this.conData) return reject('No connection data were provided!');
            this.pool = new mysql.createPool(this.conData);
            this.pool.getConnection((err, connection) => {
                if(err){
                    this.pool = null;
                    return reject(err);
                };
                connection.release();
                resolve();
            });
            this.pool.on('error', function(err){
                this.pool = null;
                throw err;
            });
        });
    };

    /**
     * Runs an SQL query asynchronously.
     * @param {string} q A valid SQL query to run.
     * @param {(string|string[])} vars Optional values to escape.
     */
    sql(q, vars=''){
        return new Promise((resolve, reject) => {
            if(!this.pool) return reject('I\'m not connected to any database!');
            this.pool.query(q, vars, function(err, result){
                if(err) return reject(err);
                resolve(result);
            });
        });
    };
};

module.exports = Database;