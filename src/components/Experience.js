import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  Card,
  CardBody,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { Fade } from "react-reveal";
import ExperienceArray from "./ExperienceArray";

export default function Experience({ color }) {
  const experience = ExperienceArray();
  
  const sectionHaut = experience.slice(0, 4); 
  const sectionBas = experience.slice(4, 7);  

  return (
    <Container maxW={"6xl"} id="experience" centerContent>
      {/* --- PREMIÈRE SECTION : PERFORMANCE --- */}
      <Stack
        textAlign={"center"}
        alignItems="center"
        w="full"
      >
        <Fade bottom>
          <Stack align="center" direction="column" spacing={4} mt={0} pb={20}>
            <Text color={`${color}.400`} fontSize="2xl" fontWeight={800} textTransform="uppercase">
              Performance Artistique
            </Text>
            <Divider borderColor={`${color}.400`} width="50px" borderBottomWidth="3px" />
          </Stack>
        </Fade>

        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 4 }} 
          spacing={16} 
          px={4}
        >
          {sectionHaut.map((exp) => (
            <Fade bottom key={exp.company}>
              <Card
                bg="transparent"
                border="4px solid #D4AF37"
                borderRadius="25px"
                overflow="hidden"
                width="220px"
                _hover={{ transform: "scale(1.05)", boxShadow: "0 0 20px #D4AF37" }}
              >
                <CardBody p={0}>
                  <Image 
                    src={exp.image} 
                    objectFit="cover" 
                    objectPosition="top" 
                    h="200px" 
                    w="100%" 
                    alt={exp.company} 
                  />
                  <Box bg="rgba(0,0,0,0.8)" p={2}>
                    <Text color="#D4AF37" fontWeight="bold">{exp.company}</Text>
                  </Box>
                </CardBody>
              </Card>
            </Fade>
          ))}
        </SimpleGrid>
      </Stack>

      {/* --- L'ESPACE DE TRANSITION (Indispensable pour le scroll) --- */}
      <Box h="100px" w="full" /> 

      {/* --- DEUXIÈME SECTION : TECHNIQUES (Avec Fade pour le déroulé) --- */}
      <Stack
        textAlign={"center"}
        alignItems="center"
        w="full"
      >
        <Fade bottom>
          <Stack align="center" direction="column" spacing={4} pb={20}>
            <Text color={`${color}.400`} fontSize="2xl" fontWeight={800} textTransform="uppercase">
              COMPÉTENCES TECHNIQUES
            </Text>
            <Divider borderColor={`${color}.400`} width="50px" borderBottomWidth="3px" />
          </Stack>
        </Fade>

        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={16} 
          px={4}
        >
          {sectionBas.map((exp) => (
            <Fade bottom key={exp.company}>
              <Card
                bg="transparent"
                border="4px solid #D4AF37"
                borderRadius="25px"
                overflow="hidden"
                width="250px"
                _hover={{ transform: "scale(1.05)", boxShadow: "0 0 20px #D4AF37" }}
              >
                <CardBody p={0}>
                  <Image 
                    src={exp.image} 
                    objectFit="cover" 
                    objectPosition="top" 
                    h="220px" 
                    w="100%" 
                    alt={exp.company} 
                  />
                  <Box bg="rgba(0,0,0,0.8)" p={2}>
                    <Text color="#D4AF37" fontWeight="bold">{exp.company}</Text>
                  </Box>
                </CardBody>
              </Card>
            </Fade>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}