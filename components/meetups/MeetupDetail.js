import styles from "./MeetupDetail.module.css";
import Head from "next/head";

export default function MeetupDetail({ meetup }) {
    return (
        <>
            <Head>
                <title>{meetup.title}</title>
            </Head>
            <section className={styles.detail}>
                <img src={meetup.image} alt={meetup.title} className={styles.image}/>
                <h1>{meetup.title}</h1>
                <address>
                    {meetup.address}
                </address>
                <p>{meetup.description}</p>
            </section>
        </>

    )
}