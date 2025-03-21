import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

if (!uri) {
  throw new Error("Please add your MongoDB URI to the .env.local file");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (
    !(global as { _mongoClientPromise?: Promise<MongoClient> })
      ._mongoClientPromise
  ) {
    client = new MongoClient(uri, options);
    (
      global as { _mongoClientPromise?: Promise<MongoClient> }
    )._mongoClientPromise = client.connect();
  }
  client = new MongoClient(uri, options);
  clientPromise =
    (global as { _mongoClientPromise?: Promise<MongoClient> })
      ._mongoClientPromise || client.connect();
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
