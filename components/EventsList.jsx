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
    import { deleteEvents, toggleEventsStatus } from "../api/events";
    const EventsList = () => {
    const [events, setEvents] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    useEffect(() => {
        if (!user) {
            setEvents([]);
            return;
            }
            const q = query(collection(db, "events"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setEvents(ar);
            });
    }, [user]);
    const handleEventsDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this event?")) {
    deleteEvents(id);
    toast({ title: "Event deleted successfully", status: "success" });
    }
    };
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleEventsStatus({ docId: id, status: newStatus });
    toast({
    title: `Event marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    });
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {events &&
    events.map((events) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    {events.title}{" "}
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
    onClick={() => handleEventsDelete(events.id)}
    >
    <FaTrash />
    </Badge>
    <Badge
    color={events.status == "pending" ? "gray.500" : "green.500"}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleToggle(events.id, events.status)}
    >
    {events.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    float="right"
    opacity="0.8"
    bg={events.status == "pending" ? "yellow.500" : "green.500"}
    >
    {events.status}
    </Badge>
    </Heading>
    <Text>{events.description}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default EventsList;