import { useState } from "react";
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
  Link,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Fade } from "react-reveal";
import ExperienceArray from "./ExperienceArray";

export default function Experience({ color }) {
  const experience = ExperienceArray();
  const [selectedExp, setSelectedExp] = useState(null);

  // Découpage des expériences (Haut = 4 premières, Bas = 3 suivantes)
  const sectionHaut = experience.slice(0, 4); 
  const sectionBas = experience.slice(4, 7);  

  return (
    <Container maxW={"6xl"} id="experience" centerContent>
      
      {/* --- SECTION PERFORMANCE ARTISTIQUE --- */}
      <Stack textAlign={"center"} alignItems="center" w="full" mt={20}>
        <Fade bottom duration={1000}>
          <Stack align="center" direction="column" spacing={4} pb={10}>
            <Text color={`${color}.400`} fontSize="2xl" fontWeight={800} textTransform="uppercase">
              Performance Artistique
            </Text>
            <Divider borderColor={`${color}.400`} width="50px" borderBottomWidth="3px" />
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} px={4}>
            {sectionHaut.map((exp) => (
              <Link key={exp.company} href="#details-container" onClick={() => setSelectedExp(exp)} _hover={{ textDecoration: 'none' }}>
                <Card 
                  cursor="pointer" bg="transparent" border="4px solid #D4AF37" borderRadius="25px" overflow="hidden" 
                  _hover={{ transform: "scale(1.05)", boxShadow: "0 0 20px #D4AF37" }}
                >
                  <CardBody p={0}>
                    <Image src={exp.image} objectFit="cover" objectPosition="top" h="200px" w="100%" alt={exp.company} />
                    <Box bg="rgba(0,0,0,0.8)" p={2} textAlign="center">
                      <Text color="#D4AF37" fontWeight="bold">{exp.company}</Text>
                    </Box>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </Fade>
      </Stack>

      <Box h="100px" w="full" /> 

      {/* --- SECTION COMPÉTENCES TECHNIQUES --- */}
      <Stack textAlign={"center"} alignItems="center" w="full">
        <Fade bottom duration={1000}>
          <Stack align="center" direction="column" spacing={4} pb={10}>
            <Text color={`${color}.400`} fontSize="2xl" fontWeight={800} textTransform="uppercase">
              Compétences Techniques
            </Text>
            <Divider borderColor={`${color}.400`} width="50px" borderBottomWidth="3px" />
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} px={4}>
            {sectionBas.map((exp) => (
              <Link key={exp.company} href="#details-container" onClick={() => setSelectedExp(exp)} _hover={{ textDecoration: 'none' }}>
                <Card 
                  cursor="pointer" bg="transparent" border="4px solid #D4AF37" borderRadius="25px" overflow="hidden" 
                  _hover={{ transform: "scale(1.05)", boxShadow: "0 0 20px #D4AF37" }}
                >
                  <CardBody p={0}>
                    <Image src={exp.image} objectFit="cover" objectPosition="top" h="220px" w="100%" alt={exp.company} />
                    <Box bg="rgba(0,0,0,0.8)" p={2} textAlign="center">
                      <Text color="#D4AF37" fontWeight="bold">{exp.company}</Text>
                    </Box>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </Fade>
      </Stack>

      {/* --- RECTANGLE D'INFORMATIONS (TRANSITION FLUIDE) --- */}
      <Box 
        id="details-container" 
        mt={20} mb={20} p={10} w="full" 
        border="2px solid #D4AF37" borderRadius="20px" bg="rgba(0,0,0,0.9)"
      >
        {selectedExp ? (
          /* La KEY permet de relancer l'animation proprement à chaque changement d'onglet */
          <Fade bottom duration={1000} key={selectedExp.company}>
            <Stack spacing={8} align="center" textAlign="center">
              <Text color="#D4AF37" fontSize="3xl" fontWeight="bold">{selectedExp.company}</Text>

              {/* SECTION VISUELLE : Extrait vidéo (Preview) ou Image */}
              <Box w="full" maxW="800px" borderRadius="xl" overflow="hidden" border="1px solid #D4AF37" bg="black">
                {selectedExp.preview ? (
                  <video 
                    src={selectedExp.preview} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    controls 
                    style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }}
                  />
                ) : (
                  <Image src={selectedExp.image} w="full" h="auto" maxH="450px" objectFit="contain" />
                )}
              </Box>

              {/* BOUTON YOUTUBE VERSION LONGUE */}
              {selectedExp.video && (
                <Button 
                  as="a" 
                  href={selectedExp.video.replace("embed/", "watch?v=")} 
                  target="_blank" 
                  leftIcon={<ExternalLinkIcon />} 
                  colorScheme="yellow" 
                  borderRadius="full" 
                  px={10}
                >
                  Voir la vidéo complète sur YouTube
                </Button>
              )}

              {/* DESCRIPTION TEXTUELLE */}
              <Box maxW="850px" px={4}>
                <List spacing={4}>
                  {selectedExp.descriptionLines.map((text, i) => (
                    <ListItem key={i} color="gray.100" fontSize="lg" lineHeight="1.6" fontStyle="italic">
                      {text}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          </Fade>
        ) : (
          <Text color="gray.500" textAlign="center" py={10}>
            Cliquez sur une carte pour explorer mon univers.
          </Text>
        )}
      </Box>
    </Container>
  );
}