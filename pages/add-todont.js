import { Container, Box, Link } from "@chakra-ui/react";
import AddTodont from "../components/AddTodont";

export default function AddToDo() {
    return (
        <Container maxW="7xl">
        <Box display="flex" alignItems="center" justifyContent="space-around" pb="5%">
            <Link href="/todonts" fontSize="xl">List All To Donts</Link>
            <Link href="/" fontSize="xl">List All To Dos</Link>
        </Box>
        <AddTodont />
        </Container>
    );
}