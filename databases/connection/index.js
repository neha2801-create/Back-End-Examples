import m from 'mongodb';
const {MongoClient} = m;

// Connection URI (This is a database on my MongoDB Atlas)
const remoteurl = 'mongodb+srv://chester_the_tester:pfwcs@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority';
// const localurl = 'mongodb://localhost:27017';

// Use connect method to connect to the Server
const client = new MongoClient(remoteurl, { useUnifiedTopology: true });
await client.connect();

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

