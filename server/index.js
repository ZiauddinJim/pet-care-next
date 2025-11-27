require('dotenv').config();
const express = require('express')
const cors = require("cors")
const app = express()
const port = process.env.PORT;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middleware
app.use(cors())
app.use(express.json());


// Connect MongoDB
const uri = process.env.URI
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// app run
app.get('/', (req, res) => {
    res.send('This is my Pet Care server!')
})


// MongoDB connection
async function run() {
    try {
        //  Section: Connect the client to the server
        await client.connect();
        const db = client.db("petCare")
        const petServiceCollection = db.collection("petService")
        const petServiceBookingCollection = db.collection("petBooking")

        //  Section: GET METHOD
        app.get("/petService", async (req, res) => {
            const result = await petServiceCollection.find().toArray();
            res.send(result)
        })

        app.get("/petService/:_id", async (req, res) => {
            const result = await petServiceCollection.findOne({ _id: new ObjectId(req.params._id) })
            res.send(result)
        })

        app.post("/bookings", async (req, res) => {
            const result = await petServiceBookingCollection.insertOne(req.body)
            res.send(result)
        })

        app.get("/bookings", async (req, res) => {
            const { email } = req.query;
            const query = {};
            if (email) query.email = email;
            const cursor = petServiceBookingCollection.find(query).sort({ createdAt: -1 });
            const results = await cursor.toArray();
            res.send(results);
        });


        app.delete("/bookings/:_id", async (req, res) => {            
            const result = await petServiceBookingCollection.deleteOne({ _id: new ObjectId(req.params._id) })
            res.send(result)
        })



        //  Section: server run check
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



//  Section: app published
app.listen(port, () => {
    console.log(`Pet Care server is running to now port: ${port}`)
})