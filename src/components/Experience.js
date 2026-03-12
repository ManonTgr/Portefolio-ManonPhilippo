import { useState } from "react";
import {
  Divider, Stack, Text, Container, Box, Card, CardBody, 
  Image, SimpleGrid, Link, List, ListItem, Button, IconButton, HStack
} from "@chakra-ui/react";
import { ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Fade } from "react-reveal";
import ExperienceArray from "./ExperienceArray";

export default function Experience({ color }) {
  const experience = ExperienceArray();
  const [selectedExp, setSelectedExp] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = () => {
    if (selectedExp?.carouselImages?.length) {
      setImgIndex((prev) => (prev + 1) % selectedExp.carouselImages.length);
    }
  };

  const prevImg = () => {
    if (selectedExp?.carouselImages?.length) {
      setImgIndex((prev) => (prev - 1 + selectedExp.carouselImages.length) % selectedExp.carouselImages.length);
    }
  };

  // 4 premières cartes en haut, tout le reste en bas
  const sectionHaut = experience.slice(0, 4); 
  const sectionBas = experience.slice(4);  

  return (
    <Container maxW={"6xl"} id="experience" centerContent>
      
      {/* --- GRILLE SECTION 1 --- */}
      <Stack textAlign={"center"} alignItems="center" w="full" mt={20}>
        <Fade bottom duration={1000}>
          <Stack align="center" direction="column" spacing={4} pb={10}>
            <Text color={`${color}.400`} fontSize="2xl" fontWeight={800} textTransform="uppercase">
              Engagements & Performances
            </Text>
            <Divider borderColor={`${color}.400`} width="50px" borderBottomWidth="3px" />
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} px={4}>
            {sectionHaut.map((exp) => (
              <Link key={exp.company} href="#details-container" onClick={() => { setSelectedExp(exp); setImgIndex(0); }} _hover={{ textDecoration: 'none' }}>
                <Card cursor="pointer" bg="transparent" border="4px solid #D4AF37" borderRadius="25px" overflow="hidden" _hover={{ transform: "scale(1.05)", boxShadow: "0 0 20px #D4AF37" }}>
                  <CardBody p={0}>
                    <Image src={exp.image} h="200px" w="100%" objectFit="cover" objectPosition="top" />
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

      {/* --- GRILLE SECTION 2 --- */}
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
              <Link key={exp.company} href="#details-container" onClick={() => { setSelectedExp(exp); setImgIndex(0); }} _hover={{ textDecoration: 'none' }}>
                <Card cursor="pointer" bg="transparent" border="4px solid #D4AF37" borderRadius="25px" overflow="hidden">
                  <CardBody p={0}>
                    <Image src={exp.image} h="220px" w="100%" objectFit="cover" objectPosition="top" />
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

      {/* --- RECTANGLE DE DÉTAILS --- */}
      <Box id="details-container" mt={20} mb={20} p={10} w="full" border="2px solid #D4AF37" borderRadius="20px" bg="rgba(0,0,0,0.9)">
        {selectedExp ? (
          <Fade bottom duration={1000} key={selectedExp.company}>
            <Stack spacing={8} align="center" textAlign="center">
              <Text color="#D4AF37" fontSize="3xl" fontWeight="bold">{selectedExp.company}</Text>

              <Box w="full" maxW="800px" h={{ base: "400px", md: "600px" }} borderRadius="xl" overflow="hidden" border="1px solid #D4AF37" bg="black" position="relative">
                {selectedExp.carouselImages && selectedExp.carouselImages.length > 0 ? (
                  <>
                    <Image src={selectedExp.carouselImages[imgIndex]} w="100%" h="100%" objectFit="contain" key={imgIndex} />
                    <HStack position="absolute" bottom="4" right="4" spacing={3} bg="rgba(0,0,0,0.7)" px={4} py={2} borderRadius="full" border="1px solid rgba(212, 175, 55, 0.4)">
                      <IconButton icon={<ChevronLeftIcon />} onClick={prevImg} colorScheme="yellow" isRound size="xs" variant="ghost" />
                      <Text color="white" fontWeight="bold" fontSize="sm">{imgIndex + 1} / {selectedExp.carouselImages.length}</Text>
                      <IconButton icon={<ChevronRightIcon />} onClick={nextImg} colorScheme="yellow" isRound size="sm" variant="ghost" />
                    </HStack>
                  </>
                ) : selectedExp.preview ? (
                  <video src={selectedExp.preview} autoPlay loop muted playsInline controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <Image src={selectedExp.image} w="100%" h="100%" objectFit="contain" />
                )}
              </Box>

              {selectedExp.video && (
                <Button 
                    as="a" 
                    href={selectedExp.video.includes("http") ? selectedExp.video : `https://www.youtube.com/watch?v=${selectedExp.video}`}
                    target="_blank" 
                    leftIcon={<ExternalLinkIcon />} 
                    colorScheme="yellow" 
                    borderRadius="full" 
                    px={10}
                >
                  Voir la vidéo complète sur YouTube
                </Button>
              )}

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
          <Text color="gray.500" textAlign="center" py={10}>Cliquez sur une carte pour explorer mon univers.</Text>
        )}
      </Box>
    </Container>
  );
}