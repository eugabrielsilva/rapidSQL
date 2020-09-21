const mysql = require('mysql');

class Database{
    /**
     * Stores the current connection pool.
     * @type {mysql.Pool}
     */
    pool = null;

    /**
     * Stores all connection options.
     * @type {{host: string, user: string, password: string, database: string, port: number, connectionLimit: number, stringifyObjects: boolean, debug: boolean, supportBigNumbers: boolean, multipleStatements: boolean}}
     */
    connectionOptions = null;

    /**
     * 
     * @param {{host: string, user: string, password: string, database: string, port: number, connectionLimit: number, stringifyObjects: boolean, debug: boolean}} connectionOptions The connection options to be passed to mysql driver.
     */
    constructor({host='localhost', user, password, database, port=3306, connectionLimit=10, stringifyObjects=false, debug=false}){
        if(!user) throw 'Please provide a user!';
        if(!password) throw 'Please provide a password!';
        if(!database) throw 'Please provide a database!';
        this.connectionOptions = {
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
            if(!this.connectionOptions) return reject('No connection options were provided!');
            try{
                this.pool = new mysql.createPool(this.connectionOptions);
                this.pool.getConnection((err, connection) => {
                    if(err){
                        this.pool = null;
                        return reject(err);
                    };
                    connection.release();
                    resolve();
                });
            }catch(error){
                throw error;
            };
        });
    };

    /**
     * Runs an SQL query asynchronously.
     * @param {string} q A valid SQL query to run.
     * @param {*} vars Optional values to escape.
     */
    sql(q, vars=''){
        return new Promise((resolve, reject) => {
            if(!this.pool) return reject('I\'m not connected to any database!');
            try{
                this.pool.query(q, vars, (err, result) => {
                    if(err) return reject(err);
                    resolve(result);
                });
            }catch(error){
                throw error;
            };
        });
    };

    /**
     * Closes the connection after all pending queries are executed.
     */
    close(){
        return new Promise((resolve, reject) => {
            if(!this.pool) return reject('I\'m not connected to any database!');
            try{
                this.pool.end((err) => {
                    if(err) return reject(err);
                });
                this.pool = null;
                resolve();
            }catch(error){
                throw error;
            };
        });
    };
};

module.exports = Database;