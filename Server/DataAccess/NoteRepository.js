'use strict';

const ObjectID = require('mongodb').ObjectID;
require('dotenv').config(); 
const DbConnection = require('./DbConnection');
const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGODB_CONNECTION_STRING;
// const connectionString = 'mongodb://localhost:27017'
const client = new MongoClient(connectionString);
const databaseName = 'noteworx'
const collectionName = 'notes';
const database = client.db(databaseName);
const collection = database.collection(collectionName);

// const connect = () => new DbConnection('mongodb+srv://rajeeb:jzEY6e3O0KiKzgar@cluster0.8zm2g8u.mongodb.net/?retryWrites=true&w=majority');

const filters = {
    id: (id) => {
        return { _id: new ObjectID(id) };
    },
    tag: (tag) => {
        return { tags: { $regex: new RegExp(tag, 'i') } };
    },
    title: (title) => {
        return { 'title': { $regex: new RegExp(title, 'i') } };
    }
};

class NoteRepository {

    addNote(note) {


        return new Promise(async (resolve, reject) => {
            await client.connect();
            console.log('Connected to MongoDB');




            collection.findOne(filters.title(note.title))
                .then(noteData => {
                    if (noteData) {
                        // connection.close();
                        reject(Error('Note already exists'));
                    } else {
                        collection
                            .insertOne(note)
                            .then(result => {
                                // connection.close();
                                resolve({ id: result.insertedId });
                            })
                            .catch(error => {
                                // connection.close();
                                reject(error);
                            });
                    }
                })
            // .catch(error => {
            //     console.log(error)
            //     connection.close();
            //     reject(error);
            // });
        })
            .catch(error => {
                console.log(error)

                reject(error);
                connection.close();
            });
        // });
    }


    findNoteById(id) {
        // const connection = connect();

        return new Promise((resolve, reject) => {
            // connection
            //     .open()
            //     .then(() => {
            //         connection.Db.collection(collection)
            collection.findOne(filters.id(id))
                .then(note => {
                    resolve(note);
                    // connection.close();
                })
                .catch(error => {
                    reject(error);
                    // connection.close();
                });
        })
        //         .catch(error => {
        //             reject(error);
        //             connection.close();
        //         });
        // });
    }


    findNotesByTag(tag) {
        // const connection = connect();

        return new Promise((resolve, reject) => {
            // connection
            //     .open()
            //     .then(() => {
            //         connection.Db.collection(collection)
            collection.find(filters.tag(tag))
                .sort({ updated_date: -1 })
                .toArray()
                .then(notes => {
                    resolve(notes);
                    // connection.close();
                })
                .catch(error => {
                    reject(error);
                    // connection.close();
                });
        })
    //         .catch(error => {
    //             reject(error);
    //             connection.close();
    //         });
    // });
}


findNotesByTitle(title) {
    // const connection = connect();

    return new Promise((resolve, reject) => {
        // connection
        //     .open()
        //     .then(() => {
        //         connection.Db.collection(collection)
        collection.find(filters.title(title))
            .sort({ updated_date: -1 })
            .toArray()
            .then(notes => {
                resolve(notes);
                // connection.close();
            })
            .catch(error => {
                reject(error);
                // connection.close();
            });
    })
    //         .catch(error => {
    //             reject(error);
    //             connection.close();
    //         });
    // });
}


listNotes() {
    // const connection = connect();

    return new Promise((resolve, reject) => {
        // connection
        //     .open()
        //     .then(() => {
        //         connection.Db.collection(collection)
        collection.find()
            .sort({ updated_date: -1 })
            .toArray()
            .then(notes => {
                resolve(notes);
                // connection.close();
            })
            .catch(error => {
                reject(error);
                // connection.close();
            });
    })
    //         .catch(error => reject(error));
    // });
}


removeNote(id) {
    // const connection = connect();

    return new Promise((resolve, reject) => {
        //    connection 
        //         .open()
        //         .then(() => {
        //             connection.Db
        //                 .collection(collection)
        collection.findOneAndDelete(filters.id(id))
            .then(() => {
                resolve();
                // connection.close();
            })
            .catch(error => {
                reject(error);
                // connection.close();
            });
    })
    //         .catch(error => {
    //             resolve(error);
    //             connection.close();
    //         });
    // });
}


tagNote(id, tags) {
    // const connection = connect();

    const update = {
        $addToSet: {
            tags: {
                $each: tags
            }
        }
    };

    return new Promise((resolve, reject) => {
        // connection
        //     .open()
        //     .then(() => {
        //         connection.Db
        //             .collection(collection)
        collection.findOneAndUpdate(
            filters.id(id),
            update
        )
            .then(() => {
                resolve();
                // connection.close();
            })
            .catch(error => {
                reject(error);
                //     connection.close();
            });
    })
    //         .catch(error => {
    //             reject(error);
    //             connection.close();
    //         });
    // });
}


updateNote(id, note) {
    // const connection = connect();

    return new Promise((resolve, reject) => {
        // connection
        //     .open()
        //     .then(() => {
        //         connection.Db
        //             .collection(collection)
        collection.updateOne(
            filters.id(id),
            {
                $set: {
                    title: note.title,
                    content: note.content,
                    tags: note.tags,
                    updated_date: note.updated_date
                }
            })
            .then(() => {
                resolve();
                // connection.close();
            })
            .catch(error => {
                reject(error);
                // connection.close();
            });
    })
    //         .catch(error => {
    //             resolve(error);
    //             connection.close();
    //         });
    // });
}
}

module.exports = NoteRepository;