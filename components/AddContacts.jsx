import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addContacts } from "../api/contacts";
const AddContacts = () => {
    const [contactName, setContactName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [contactAdress, setContactAdress] = React.useState("");
    const [contactRelation, setContactRelation] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleContactsCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a contact",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const contacts = {
        contactName,
        description,
        contactAdress,
        contactRelation,
        status,
        userId: user.uid,
        };
        await addContacts(contacts);
        setIsLoading(false);
        setContactName("");
        setDescription("");
        setContactAdress("");
        setContactRelation("");
        toast({ title: "Contact created successfully", status: "success" });
    };
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">
        <Input
        placeholder="Contact Name"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        />
        <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <Textarea
        placeholder="Adress"
        value={contactAdress}
        onChange={(e) => setContactAdress(e.target.value)}
        />
        <Textarea
        placeholder="Relation to Contact"
        value={contactRelation}
        onChange={(e) => setContactRelation(e.target.value)}
        />
        <Button
        onClick={() => handleContactsCreate()}
        disabled={contactName.length < 1 || description.length < 1 || contactAdress.length < 1 || contactRelation.length < 1 || isLoading}
        variantColor="teal"
        variant="solid"
        >
        Add
        </Button>
        </Stack>
        </Box>
    );
};
export default AddContacts;