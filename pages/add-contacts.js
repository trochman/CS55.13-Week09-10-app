import { Container, Box } from "@chakra-ui/react";
import AddContacts from "../components/AddContacts";
import NavHeader from "../components/NavHeader";

export default function AddContact() {
    return (
        <Container maxW="7xl">
            <AddContacts />
        </Container>
    );
}