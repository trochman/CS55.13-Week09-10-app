import { Container, Box, Link } from "@chakra-ui/react";
import AddContacts from "../components/AddContacts";
import Header from "../components/Header";
import { auth } from "../firebase/";


export default function AddContact() {
    return (
        <Container maxW="7xl">
        <Box display="flex" alignItems="center" justifyContent="space-around" pb="5%">
            <Header 
            email={auth.email} 
            signOut={auth.signOut} />
        </Box>
        <AddContacts />
        </Container>
    );
}