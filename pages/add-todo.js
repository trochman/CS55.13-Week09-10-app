import { Container, Box, Link } from "@chakra-ui/react";
import AddTodos from "../components/AddTodo";

export default function AddToDo() {
    return (
        <Container maxW="7xl">
        <Box display="flex" alignItems="center" justifyContent="space-around" pb="5%">
            <Link href="/" fontSize="xl">List All To Dos</Link>
            <Link href="/events" fontSize="xl">List All Events</Link>
            <Link href="/contacts" fontSize="xl">List All Contacts</Link>
        </Box>
        <AddTodos />
        </Container>
    );
}