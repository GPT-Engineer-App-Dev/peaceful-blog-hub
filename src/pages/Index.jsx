import { Container, Text, VStack, Heading, Box, Image, Link, Button, useColorModeValue } from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaLinkedin, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  return (
    <Container centerContent maxW="container.md" py={8} bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to My Blog</Heading>
        <Box boxSize="sm">
          <Image src="/images/blog-image.jpg" alt="Blog Image" borderRadius="full" />
        </Box>
        <Text fontSize="lg" textAlign="center">
          Hi, I'm [Your Name], a passionate writer and developer. Follow my journey as I share insights on technology, programming, and life.
        </Text>
        <Button as={RouterLink} to="/add-post" colorScheme="blue">Add New Post</Button>
        <VStack spacing={4} width="full">
          {posts.map((post, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" width="full">
              <Heading fontSize="xl">{post.title}</Heading>
              {post.imageUrl && <Image src={post.imageUrl} alt={post.title} mt={4} />}
              <Text mt={4}>{post.content}</Text>
              <Button leftIcon={<FaTrash />} colorScheme="red" mt={4} onClick={() => handleDelete(index)}>Delete</Button>
            </Box>
          ))}
        </VStack>
        <VStack spacing={2}>
          <Link href="https://twitter.com" isExternal>
            <FaTwitter size="24px" />
          </Link>
          <Link href="https://github.com" isExternal>
            <FaGithub size="24px" />
          </Link>
          <Link href="https://linkedin.com" isExternal>
            <FaLinkedin size="24px" />
          </Link>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;