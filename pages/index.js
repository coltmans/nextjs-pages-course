import MeetupList from "@/components/meetups/MeetupList";
import {MongoClient, ServerApiVersion} from "mongodb";
import Head from "next/head";

export async function getStaticProps() {

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
    const meetups = await  meetupsCollection.find().toArray();
    await client.close();

    return {
       props: {
           meetups: meetups.map((meetup) => ({
               title: meetup.title,
               address: meetup.address,
               image: meetup.image,
               description: meetup.description,
               id: meetup._id.toString(),
           })),
       },
        revalidate: 10
    }
}

// export async function getServerSideProps(context) {
//     const meetups = DUMMY;//await fetch('./meetups.json');
//     return {
//         props: {
//             meetups
//         }
//     }
// }

export default function Home(props) {

    return (
        <>
            <Head>
                <title>Meetup App</title>
            </Head>
            <h1>Homepage</h1>
            <MeetupList meetups={props.meetups}/>
        </>

    )
}