import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Flex,
  Image,
} from "@chakra-ui/react";
import ProfileArray from "./ProfileArray";

export default function Header({ color }) {
  const profile = ProfileArray();

  return (
    <Container maxW={"7xl"} id="hero" pt={{ base: 10, md: 50 }} pb={{ base: 10, md: 70 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        w="full"
      >
        {/* GAUCHE : Nom et Slogan */}
        <Stack spacing={4} align={{ base: "center", md: "start" }} textAlign={{ base: "center", md: "left" }}>
          <Heading
            fontWeight={800}
            fontSize={{ base: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color="pink.600"
            textTransform="uppercase"
          >
            {profile.headerName}
          </Heading>
          <Text
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight={700}
            lineHeight="1.2"
            maxW="500px"
          >
            <Text as="span" color="#D4AF37">Entre rigueur technique </Text>
            <Text as="span" color="#D4AF37">et sensibilité </Text>
            <Text as="span" color="pink.600">artistique.</Text>
          </Text>
        </Stack>

        {/* DROITE : Portrait avec ta photo */}
        <Box mt={{ base: 10, md: 0 }} position="relative">
          <Image
  src="/assets/moi.jpg" // Chemin direct depuis le dossier public
  borderRadius="full"
  boxSize={{ base: "250px", md: "350px" }}
  objectFit="cover"
  border="6px solid #D4AF37"
  boxShadow="0 0 30px rgba(212, 175, 55, 0.6)"
  alt="Manon Philippo"
/>
        </Box>
      </Flex>
    </Container>
  );
} 