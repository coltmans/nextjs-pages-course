import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from "next/head";

export default function New() {
    const router = useRouter();
    const handleAddMeetup = async (formData) => {
         const resp = await fetch("/api/meetup/", {
             method: 'PUT',
             body: JSON.stringify(formData),
             headers: {
                 'Content-Type': 'application/json'
             }
         })

        const data = await resp.json();
         console.info(data);

         await router.replace("/");
    }

    return  (
        <>
            <Head>
                <title>New meetup</title>
            </Head>
            <h1>New meetup</h1>
            <NewMeetupForm onAddMeetup={handleAddMeetup} />
        </>
    )
}