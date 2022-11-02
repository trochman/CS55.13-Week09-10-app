import { Container } from "@chakra-ui/react";
import EventsList from "../components/EventsList";

export default function Events() {
    return (
        <Container maxW="7xl">
        <EventsList />
        </Container>
    );
    }