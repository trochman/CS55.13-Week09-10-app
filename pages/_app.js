import { ChakraProvider, Box } from "@chakra-ui/react";
import Auth from "../components/Auth";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
        <Box display="flex" alignItems="center" justifyContent="flex-end" pr="5%" pt="2%">
            <Auth />
        </Box>
        <Component {...pageProps} />
        </ChakraProvider>
    );
}
export default MyApp;
