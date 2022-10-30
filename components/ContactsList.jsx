import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaTrash } from "react-icons/fa";
    import { deleteContacts } from "../api/contacts";
    const ContactsList = () => {
    const [contacts, setContacts] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    useEffect(() => {
        if (!user) {
            setContacts([]);
            return;
            }
            const q = query(collection(db, "contacts"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setContacts(ar);
            });
    }, [user]);
    const handleContactsDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this contact?")) {
    deleteContacts(id);
    toast({ title: "Contact deleted successfully", status: "success" });
    }
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {contacts &&
    contacts.map((contacts) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    {contacts.name}{" "}
    <Badge
    color="red.500"
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleContactsDelete(contacts.id)}
    >
    <FaTrash />
    </Badge>
    </Heading>
    <Text>{contacts.description}</Text>
    <Text>{contacts.adress}</Text>
    <Text>{contacts.relation}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default ContactsList;