/*
  Refer to https://www.edx.org/course/introduction-to-nodejs by Azat Mardan
*/

import MongoClient from 'mongodb';

const insertDocuments = (collection) => {
  return new Promise((resolve, reject) => {// Insert 3 documents
    collection.insertMany([
      { name: 'Bob' }, { name: 'John' }, { name: 'Peter' } // 3 documents
    ], (error, result) => {
      if (error)
        reject();

      console.log(result.insertedCount); // will be 3
      console.log('Inserted 3 documents into the course-students collection');

      resolve();
    })
  });
};

const updateDocument = (collection) => {
  return new Promise((resolve, reject) => {
    // Update document where a is 2, set b equal to 1
    const name = 'Peter'
    collection.updateOne({ name: name }, { $set: { grade: 'A' } }, (error, result) => {
      if (error)
        reject()

      console.dir(result.modifiedCount) // will be 1
      console.log(`Updated the student document where name = ${name}`)

      resolve();
    })
  });
};

const removeDocument = (collection) => {
  return new Promise((resolve, reject) => {
    // Insert some documents
    const name = 'Bob'
    collection.deleteOne({ name: name }, (error, result) => {
      if (error)
        reject();

      console.log(result.deletedCount) // will be 1
      console.log(`Removed the document where name = ${name}`)

      resolve();
    })
  })
};

const findDocuments = (collection) => {
  return new Promise((resolve, reject) => {
    // Find some documents
    collection.find({}).toArray((error, docs) => {
      if (error)
        reject();

      console.dir(docs.length)   // will be 2 because we removed one document
      console.log(`Found the following documents:`)
      console.dir(docs)

      resolve();
    })
  });
};

// Connection URI (This is a database on my MongoDB Atlas)
const remoteurl = 'mongodb+srv://chester_the_tester:cs590@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority';
// const localurl = 'mongodb://localhost:27017'

// Use connect method to connect to the Server
MongoClient.connect(remoteurl,
  { useUnifiedTopology: true },
  async (err, client) => {
    if (err)
      return process.exit(1)

    const db = client.db('course-db')
    console.log('Connected to ' + db.databaseName)

    const collection = db.collection('course-students')

    await insertDocuments(collection);

    await updateDocument(collection);

    await removeDocument(collection);

    await findDocuments(collection);

    client.close();
  }
);
