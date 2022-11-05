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
    getDoc,
    setDoc
} from "firebase/firestore";
import { db } from "../../firebase";

export async function getServerSideProps(context) {
    let itemData = null;
    const document = doc( db, 'contacts', context.params.id )
    const snapshot = await getDoc(document);
    if (snapshot.exists()) {
        itemData = {
            id : snapshot.id,
            data : snapshot.data()
        }
    }

    return {
        props:{
            itemData
        }
    }
};

const ContactsItem= ({itemData}) => {
    const {user} = useAuth() || {};
    const [inputName, setInputName] = React.useState(itemData.data.name);
    const [inputDescription, setInputDescription] = React.useState(itemData.data.description);
    const [inputAdress, setInputAdress] = React.useState(itemData.data.adress);
    const [inputRelation, setInputRelation] = React.useState(itemData.data.relation);
    const [statusMsg, setStatusMsg] = React.useState('');
    if(!user) {
        return;
    }
    
    const sendNewData = async () => {
        const docRef = doc( db, "contacts", itemData.id )
        try{
        if (!docRef.empty) {
            setDoc(docRef,
            {
                name: inputName,
                description: inputDescription,
                adress: inputAdress,
                relation: inputRelation
            }, 
            { merge:true }
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
                {itemData.data.name}
            </Heading>
            <Text>
                {itemData.data.description}
            </Text>
            <Text>
                {itemData.data.adress}
            </Text>
            <Text>
                {itemData.data.relation}
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
                                <Input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder={itemData.data.name} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} placeholder={itemData.data.description} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Adress</FormLabel>
                                <Input type="text" value={inputAdress} onChange={(e) => setInputAdress(e.target.value)} placeholder={itemData.data.adress} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Relation</FormLabel>
                                <Input type="text" value={inputRelation} onChange={(e) => setInputRelation(e.target.value)} placeholder={itemData.data.relation} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Button
                                variantColor="teal"
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