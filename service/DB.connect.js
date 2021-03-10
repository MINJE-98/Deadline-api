const mysql = require('sync-mysql');
const config = require('./DB.config');

class Database {
    constructor(){
        this.pool = new mysql(config);
    }
    async get_query(sql){
        const result = await this.pool.query(sql)

        if (!result[0]) {
            //질의 결과가 없을경우
            throw 'DB No results';
        } else {
            //질의 결과가 있을경우
            return result;
        }
    }

    async set_query(sql){
        const result = await this.pool.query(sql)

        if (!result[0]) {
            //질의 결과가 없을경우
            throw 'DB No results';
        } else {
            //질의 결과가 있을경우
            return result;
        }
    }
}

module.exports = new Database;