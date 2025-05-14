import {
    Box,
    Flex,
    Text,
    Button,
    useColorModeValue,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';


interface NavbarProps {
    username: string;
    jobTitle: string;
    onLogout: () => void;
}

export function Navbar({ username, jobTitle, onLogout }: NavbarProps) {
    const bgColor = useColorModeValue('white', 'gray.900');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogoutConfirm = () => {
        onLogout();
        onClose();
    };

    return (
        <>
            <Box
                position="sticky"
                top={0}
                zIndex={10}
                py={2}
                mb={4}
                backdropFilter="blur(8px)"
                backgroundColor={`${bgColor}CC`}
            >
                <Flex justify="space-between" align="center" maxW="1200px" mx="auto" px={4}>
                    <Text
                        fontSize="4xl"
                        fontWeight="bold"
                        bgGradient="linear(to-r, blue.400, purple.500)"
                        bgClip="text"
                    >
                        AniList
                    </Text>

                    <HStack spacing={4}>
                        <Box textAlign="right">
                            <Text fontWeight="bold">
                                {username}
                            </Text>
                            <Text fontSize="sm">
                                {jobTitle}
                            </Text>
                        </Box>
                        <Button
                            onClick={onOpen}
                            colorScheme="red"
                            variant="ghost"
                            size="sm"
                        >
                            Logout
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay bg="blackAlpha.700" />
                <ModalContent bgColor="gray.800" color="white">
                    <ModalHeader>Confirm Logout</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to logout?
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleLogoutConfirm}>
                            Logout
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 