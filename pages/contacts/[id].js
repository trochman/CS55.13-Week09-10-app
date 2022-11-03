import React from 'react';
import {
    Box,
    Text,
    Input,
    Button,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    SimpleGrid,
    GridItem,
    Heading,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";

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

const ContactsItem= ({data}) => {
    const {user} = useAuth() || {};
    const [inputName, setInputName] = React.useState(data.name);
    const [inputDescription, setInputDescription] = React.useState(data.description);
    const [inputAdress, setInputAdress] = React.useState(data.adress);
    const [inputRelation, setInputRelation] = React.useState(data.relation);
    const [statusMsg, setStatusMsg] = React.useState('');
    if(!user) {
        return;
    }
    
    const sendNewData = async ({data}) => {
        try{
        const docref = {data}
        const doc = docref.get();

        if (!doc.empty) {
            docref.update(
            {
                name: inputName,
                description: inputDescription,
                adress: inputAdress,
                relation: inputRelation
            }
            );
            setStatusMsg("Updated!");
        }

        } catch (error) {
        console.log(error);
        }
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
            <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
                <VStack spacing={10} p={10} alignItems="flex-start">
                    <SimpleGrid columns={1} columnGap={3} rowGap={6}>
                        <GridItem colSpan={1}>
                            <Heading>Update</Heading>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder={data.name} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} placeholder={data.description} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Adress</FormLabel>
                                <Input type="text" value={inputAdress} onChange={(e) => setInputAdress(e.target.value)} placeholder={data.adress} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Relation</FormLabel>
                                <Input type="text" value={inputRelation} onChange={(e) => setInputRelation(e.target.value)} placeholder={data.relation} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Button
                                ml={2}
                                onClick={() => sendNewData()}>
                                Update
                            </Button>
                            <Text>
                            {statusMsg}
                            </Text>
                        </GridItem>
                    </SimpleGrid>
                </VStack>
            </Flex>
        </Box>
    );
};

export default ContactsItem;