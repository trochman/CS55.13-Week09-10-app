import { Container, Box, Link } from "@chakra-ui/react";
import TodontList from "../components/TodontList";

export default function ToDonts() {
    return (
        <Container maxW="7xl">
        <Box display="flex" alignItems="center" justifyContent="space-around" pb="5%">
            <Link href="/add-todont" fontSize="xl">Add To Dont</Link>
            <Link href="/add-todo" fontSize="xl">Add To Do</Link>
        </Box>
        <TodontList />
        </Container>
    );
    }