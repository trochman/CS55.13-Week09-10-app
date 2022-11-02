import { Container } from "@chakra-ui/react";
import ContactsList from "../components/ContactsList";

export default function Contacts() {
    return (
        <Container maxW="7xl">
        <ContactsList />
        </Container>
    );
    }