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
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deleteContacts, toggleContactsStatus } from "../api/contacts";
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
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleContactsStatus({ docId: id, status: newStatus });
    toast({
    title: `Contact marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    });
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
    {contacts.contactName}{" "}
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
    <Badge
    color={contacts.status == "pending" ? "gray.500" : "green.500"}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleToggle(contacts.id, contacts.status)}
    >
    {contacts.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    float="right"
    opacity="0.8"
    bg={contacts.status == "pending" ? "yellow.500" : "green.500"}
    >
    {contacts.status}
    </Badge>
    </Heading>
    <Text>{contacts.description}</Text>
    <Text>{contacts.contactAdress}</Text>
    <Text>{contacts.contactRelation}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default ContactsList;