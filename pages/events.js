import { Container, Box, Link } from "@chakra-ui/react";
import EventsList from "../components/EventsList";

export default function Events() {
    return (
        <Container maxW="7xl">
        <Box display="flex" alignItems="center" justifyContent="space-around" pb="5%">
            <Link href="/add-todo" fontSize="xl">Add To Do</Link>
            <Link href="/add-events" fontSize="xl">Add Event</Link>
            <Link href="/add-contacts" fontSize="xl">Add Contact</Link>
        </Box>
        <EventsList />
        </Container>
    );
    }