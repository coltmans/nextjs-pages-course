import MeetupDetail from "@/components/meetups/MeetupDetail";
import {MongoClient, ServerApiVersion, ObjectId} from "mongodb";
import Head from "next/head";


export async function getStaticPaths() {
    const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@cluster0.fmhvw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    const meetupsCollection = await client.db().collection('meetups');
    const collectionList = await  meetupsCollection.find().toArray();
    await client.close();

    const paths = collectionList.map(meetup => ({params: {id: meetup._id.toString()}}))
    return {
        fallback: false, paths
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.id;
    if (!meetupId) return null;

    const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@cluster0.fmhvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    const meetupsCollection = await client.db('meetups').collection('meetups');

    console.log(meetupId, await meetupsCollection.find().toArray())

    const meetup = await meetupsCollection.findOne({'_id': new ObjectId(meetupId)});

    await client.close();

    return {
        props: {
            meetup: {
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString(),
            }
        },
        // revalidate: 600
    }
}

export default function MeetupDetails({meetup}) {
    if (!meetup) return null;

    return <>

        <MeetupDetail meetup={meetup}/></>;
}