'use strict';

const MongoClient = require('mongodb').MongoClient;

class DbConnection {

    constructor(connectionUri) {
        this.Uri = connectionUri;
        console.log('working')
    }
    
    open() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.Uri)
                .then(db => {
                    this.Db = db;
                    console.log('connected')
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

    close() {
        if (this.Db) {
            this.Db.close().catch(error => console.log(error));
        }
    }
}

module.exports = DbConnection;