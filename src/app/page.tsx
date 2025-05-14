'use client';

import { Box, Container } from '@chakra-ui/react';
import { UserForm } from '@/components/user-form';
import { AnimeList } from '@/components/anime-list';
import { AnimeCategoryRow } from '@/components/anime-category-row';
import { useUser } from '@/lib/user-context';
import { Navbar } from '@/components/ui/navbar';

export default function Home() {
  const { user, setUser } = useUser();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Container maxW="container.xl" py={8}>
      {!user ? (
        <UserForm />
      ) : (
        <Box>
          <Navbar username={user.username} jobTitle={user.jobTitle} onLogout={handleLogout} />
          <AnimeCategoryRow title="Popular" sort={['POPULARITY_DESC']} />
          <AnimeCategoryRow title="Action" genre="Action" sort={['POPULARITY_DESC']} />
          <AnimeCategoryRow title="Adventure" genre="Adventure" sort={['POPULARITY_DESC']} />
          <AnimeList />
        </Box>
      )}
    </Container>
  );
}
