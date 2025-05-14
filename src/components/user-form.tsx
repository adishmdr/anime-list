'use client';

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useUser } from '@/lib/user-context';

export function UserForm() {
    const { user, setUser, updateUser } = useUser();
    const [username, setUsername] = useState(user?.username || '');
    const [jobTitle, setJobTitle] = useState(user?.jobTitle || '');
    const toast = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !jobTitle.trim()) {
            toast({
                title: 'Error',
                description: 'Please fill in all fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (user) {
            updateUser({ username, jobTitle });
            toast({
                title: 'Success',
                description: 'User information updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            setUser({ username, jobTitle });
            toast({
                title: 'Success',
                description: 'User information saved',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="gray.950"
            zIndex="modal"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                p={8}
                maxWidth="500px"
                width="100%"
                borderWidth={1}
                borderRadius={8}
                boxShadow="xl"
                bg="gray.900"
                borderColor="gray.700"
            >
                <VStack spacing={4} align="stretch">
                    <Heading size="lg" textAlign="center" color="gray.100">
                        Welcome to AniList
                    </Heading>
                    <Text textAlign="center" color="gray.400">
                        Please enter your information to continue

                    </Text>

                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel color="gray.200">Username</FormLabel>
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    bg="white"
                                    borderColor="gray.600"
                                    color="black"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel color="gray.200">Job Title</FormLabel>
                                <Input
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="Enter your job title"
                                    bg="white"
                                    borderColor="gray.600"
                                    color="black"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="blue"
                                width="100%"
                                mt={4}
                                size="lg"
                                _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
                                _active={{ transform: 'translateY(0)' }}
                            >
                                {user ? 'Update Information' : 'Submit'}
                            </Button>

                            <Text textAlign="center" color="gray.400" fontSize="xs" >
                                Leonardo.AI challange 3.5.0

                            </Text>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Box>
    );
} 