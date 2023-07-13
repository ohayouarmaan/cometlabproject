import mongoose from "mongoose";

export default async function () {
    console.log(process.env.MONGO_URI)
    const db = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cometlabs")
    console.log(`[DATABASE] Connected ${db.connection.name}`)
    return { db }
}
