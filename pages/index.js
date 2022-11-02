import { Container } from "@chakra-ui/react";
import TodoList from "../components/TodoList";

export default function Home() {
    return (
        <Container maxW="7xl">
        <TodoList />
        </Container>
    );
    }
