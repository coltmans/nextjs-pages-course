// /api/new-meetup

import {MongoClient, ServerApiVersion} from 'mongodb';

export default async function handler(req, res) {
    const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@cluster0.fmhvw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        const db = client.db();
        const meetupsCollection = await db.collection('meetups');

        if (req.method === 'PUT') {
            const result  = await meetupsCollection.insertOne(req.body);

            if (result.acknowledged) {
                res.status(201).json({
                    message: 'Meetup inserted.'
                })
            }  else {
                throw new Error('Meetup insert failed.');
            }
         }
    } catch (e) {
        console.error(e);

        res.status(500).json({
            message: 'Meetup insert failed.'
        })
    } finally {
        await client.close();
    }

}