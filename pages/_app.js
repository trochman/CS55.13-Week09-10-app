import { ChakraProvider } from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
        <NavHeader />
        <Component {...pageProps} />
        </ChakraProvider>
    );
}
export default MyApp;
