import React from "react";
import {
    Box,
    Heading,
    Text,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    SimpleGrid,
    GridItem,
    Select,
    Input,
    Button
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
    const document = doc( db, 'events', context.params.id )
    const snapshot = await getDoc(document);
    if (snapshot.exists()) {
        itemData = {
            data : snapshot.data(),
            id : snapshot.id
        }
    }

    return {
        props:{
            itemData
        }
    }
};

const EventsItem= ({itemData}) => {
    const [inputTitle, setInputTitle] = React.useState(itemData.data.title);
    const [inputDescription, setInputDescription] = React.useState(itemData.data.description);
    const [inputStatus, setInputStatus] = React.useState(itemData.data.status);
    const [statusMsg, setStatusMsg] = React.useState('');
    const {user} = useAuth() || {};
    if(!user) {
        return;
    }

    const sendNewData = async () => {
        const docRef = doc( db, "events", itemData.id )
        try{
        if (!docRef.empty) {
            setDoc(docRef,
            {
                title: inputTitle,
                description: inputDescription,
                status: inputStatus
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
                {itemData.data.title}
            </Heading>
            <Text>
                {itemData.data.description}
            </Text>
            <Text>
                {itemData.data.status}
            </Text>
            <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
                <VStack spacing={10} p={10} alignItems="flex-start">
                    <SimpleGrid columns={1} columnGap={3} rowGap={6}>
                        <GridItem colSpan={1}>
                            <Heading>Update</Heading>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder={itemData.data.title} />
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
                                <Select value={inputStatus} onChange={(e) => setInputStatus(e.target.value)}>
                                <option value={"pending"} style={{ color: "yellow", fontWeight: "bold" }}>
                                Pending ⌛
                                </option>
                                <option value={"completed"} style={{ color: "green", fontWeight: "bold" }}>
                                Completed ✅
                                </option>
                                </Select>
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

export default EventsItem;