import React from "react";
import {
    Box,
    Heading,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";

const ContactsItem= ({data}) => {
    const {user} = useAuth() || {};
    if(!user) {
        return;
    }
    return (
        <Box mt={5} pl="5%">
            <Heading as="h3" fontSize={"xl"}>
                {data.name}
            </Heading>
            <Text>
                {data.description}
            </Text>
            <Text>
                {data.adress}
            </Text>
            <Text>
                {data.relation}
            </Text>
            <Text>
                {data.createdAt}
            </Text>
        </Box>
    );
};

export async function getServerSideProps(context) {
    let data = null;
    const document = doc( db, 'contacts', context.params.id )
    const snapshot = await getDoc(document);
    if (snapshot.exists()) {
        data = snapshot.data();
    }

    return {
        props:{
            data
        }
    }
};

export default ContactsItem;