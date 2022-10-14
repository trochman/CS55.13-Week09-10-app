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
    import { deleteTodont, toggleTodontStatus } from "../api/todont";
    const TodontList = () => {
    const [todonts, setTodonts] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    useEffect(() => {
        if (!user) {
            setTodonts([]);
            return;
            }
            const q = query(collection(db, "todont"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setTodonts(ar);
            });
    }, [user]);
    const handleTodontDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todont?")) {
    deleteTodont(id);
    toast({ title: "Todont deleted successfully", status: "success" });
    }
    };
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodontStatus({ docId: id, status: newStatus });
    toast({
    title: `Todont marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    });
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {todonts &&
    todonts.map((todont) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    {todont.title}{" "}
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
    onClick={() => handleTodontDelete(todont.id)}
    >
    <FaTrash />
    </Badge>
    <Badge
    color={todont.status == "pending" ? "gray.500" : "green.500"}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleToggle(todont.id, todont.status)}
    >
    {todont.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    float="right"
    opacity="0.8"
    bg={todont.status == "pending" ? "yellow.500" : "green.500"}
    >
    {todont.status}
    </Badge>
    </Heading>
    <Text>{todont.description}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default TodontList;