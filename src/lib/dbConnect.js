import { MongoClient, ServerApiVersion } from "mongodb";

export const colletionNameObj={
    servicescoll: "services",
    userColletion: "user",
    bookingCollection: "booking"
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

function dbConnect(collectionName) {

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client
        .db(process.env.DB_NAME)
        .collection(collectionName);
}

export default dbConnect;