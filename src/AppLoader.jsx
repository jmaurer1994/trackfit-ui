import React, { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import {
  Box,
  Image,
  Container,
  Button,
  UnorderedList,
  ListItem,
  Center,
  Heading,
  useColorModeValue,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  UserContext,
  GoogleButton,
  InitializationProvider,
  AuthorizationClientContext,
} from './components/Providers';
import { App } from './App';

export const AppLoader = () => {
  const user = useContext(UserContext);

  const [appInitialized, setAppInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (authorized) {
      console.log('authorized');
    }
  }, [authorized]);

  useEffect(() => {
    if (authenticated) {
      console.log('user authenticated');
      console.log(user);
    }
  }, [authenticated, user]);
  useEffect(() => {
    if (appInitialized) {
      console.log('application initialized');
    }
  }, [appInitialized]);

  const AppWindow = () => (
    <Box
      pt={{ base: '8', lg: '12' }}
      pb={{ base: '12', lg: '24' }}
      minW="100vw"
    >
      <Outlet />
    </Box>
  );

  const AuthGuard = () => {
    if (authenticated) {
      if (authorized) {
        if (appInitialized) {
          return <App />;
        } else {
          //await initialization
          return <Initializing />;
        }
      } else {
        //await authorizaton
        return <Authorizing />;
      }
    } else {
      //await authentication
      return <PublicRoutes />;
    }
  };

  return (
    <InitializationProvider
      authenticated={authenticated}
      authorized={authorized}
      appInitialized={appInitialized}
      setAuthenticated={setAuthenticated}
      setAuthorized={setAuthorized}
      setAppInitialized={setAppInitialized}
    >
      <Box
        as="section"
        height="100vh"
        overflowY="auto"
        bgColor={useColorModeValue('brand.400', 'brand.100')}
      >
        <AuthGuard />
      </Box>
    </InitializationProvider>
  );
};

const PublicNavbar = () => {
  return (
    <Stack>
      <Stack p={2} spacing={2} direction={'row'} align={'center'}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? { display: 'none' } : undefined)}
        >
          <Button color={useColorModeValue('brand.100', 'brand.500')}>
            Home
          </Button>
        </NavLink>
        <NavLink
          to="/privacy-policy"
          style={({ isActive }) => (isActive ? { display: 'none' } : undefined)}
        >
          <Button color={useColorModeValue('brand.100', 'brand.500')}>
            Privacy Policy
          </Button>
        </NavLink>
        <NavLink
          to="/terms-of-use"
          style={({ isActive }) => (isActive ? { display: 'none' } : undefined)}
        >
          <Button color={useColorModeValue('brand.100', 'brand.500')}>
            Terms of Use
          </Button>
        </NavLink>
      </Stack>
    </Stack>
  );
};

const PublicWindow = () => (
  <Box
    pt={{ base: '0', lg: '0' }}
    pb={{ base: '12', lg: '24' }}
    minW="100vw"
    h="calc(100vh)"
  >
    <Center p={2} backgroundColor={useColorModeValue('brand.100', 'brand.200')}>
      <Image width="12rem" src="../img/logo.png" />
    </Center>
    <Container maxW={'container.xl'}>
      <Center>
        <PublicNavbar />
      </Center>
      <Outlet />
    </Container>
  </Box>
);

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicWindow />}>
          <Route index element={<Landing />} />

          <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="terms-of-use" element={<TermsOfUse />}></Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const PrivacyPolicy = () => {
  return (
    <Stack p={0} alignItems={'center'}>
      <Heading
        align={'center'}
        as={'h1'}
        size={'2xl'}
        color={useColorModeValue('brand.200', 'brand.400')}
      >
        Privacy Policy
      </Heading>
      <Text textAlign={'justify'}>
        Trackfit takes privacy very seriously. Trackfit does not collect,
        retain, distribute, or sell your data from it's servers. All data is
        retained by the client and stored in the "cloud" using the Google Drive
        API service. This privacy policy does not cover how Google may use your
        data.
      </Text>
    </Stack>
  );
};

const TermsOfUse = () => {
  return (
    <Stack p={0} alignItems={'center'}>
      <Box color={useColorModeValue('brand.200', 'brand.400')}>
        <Heading
          align={'center'}
          as={'h1'}
          size={'2xl'}
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Terms and Conditions
        </Heading>
        <Text textAlign={'justify'}>Last updated: May 15, 2022</Text>
        <Text textAlign={'justify'}>
          Please read these terms and conditions carefully before using Our
          Service.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Interpretation and Definitions
        </Heading>
        <Heading
          align={'left'}
          as={'h3'}
          size="sm"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Interpretation
        </Heading>
        <Text textAlign={'justify'}>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </Text>
        <Heading
          align={'left'}
          as={'h3'}
          size="sm"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Definitions
        </Heading>
        <Text textAlign={'left'}>
          For the purposes of these Terms and Conditions:
        </Text>
        <UnorderedList p={4}>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by or is under common control with a party, where
              "control" means ownership of 50% or more of the shares, equity
              interest or other securities entitled to vote for election of
              directors or other managing authority.
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Country</strong> refers to: Pennsylvania, United States
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Company</strong> (referred to as either "the Company",
              "We", "Us" or "Our" in this Agreement) refers to TrackFit.
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Device</strong> means any device that can access the
              Service such as a computer, a cellphone or a digital tablet.
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Service</strong> refers to the Website.
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Terms and Conditions</strong> (also referred as "Terms")
              mean these Terms and Conditions that form the entire agreement
              between You and the Company regarding the use of the Service. This
              Terms and Conditions agreement has been created with the help of
              the{' '}
              <a
                href="https://www.termsfeed.com/terms-conditions-generator/"
                target="_blank"
              >
                Terms and Conditions Generator
              </a>
              .
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Third-party Social Media Service</strong> means any
              services or content (including data, information, products or
              services) provided by a third-party that may be displayed,
              included or made available by the Service.
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>Website</strong> refers to TrackFit, accessible from{' '}
              <a
                href="https://trackfit.maurer.gg"
                rel="external nofollow noopener"
                target="_blank"
              >
                https://trackfit.maurer.gg
              </a>
            </Text>
          </ListItem>
          <ListItem>
            <Text textAlign={'justify'}>
              <strong>You</strong> means the individual accessing or using the
              Service, or the company, or other legal entity on behalf of which
              such individual is accessing or using the Service, as applicable.
            </Text>
          </ListItem>
        </UnorderedList>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Acknowledgment
        </Heading>
        <Text textAlign={'justify'}>
          These are the Terms and Conditions governing the use of this Service
          and the agreement that operates between You and the Company. These
          Terms and Conditions set out the rights and obligations of all users
          regarding the use of the Service.
        </Text>
        <Text textAlign={'justify'}>
          Your access to and use of the Service is conditioned on Your
          acceptance of and compliance with these Terms and Conditions. These
          Terms and Conditions apply to all visitors, users and others who
          access or use the Service.
        </Text>
        <Text textAlign={'justify'}>
          By accessing or using the Service You agree to be bound by these Terms
          and Conditions. If You disagree with any part of these Terms and
          Conditions then You may not access the Service.
        </Text>
        <Text textAlign={'justify'}>
          You represent that you are over the age of 18. The Company does not
          permit those under 18 to use the Service.
        </Text>
        <Text textAlign={'justify'}>
          Your access to and use of the Service is also conditioned on Your
          acceptance of and compliance with the Privacy Policy of the Company.
          Our Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your personal information when You
          use the Application or the Website and tells You about Your privacy
          rights and how the law protects You. Please read Our Privacy Policy
          carefully before using Our Service.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Links to Other Websites
        </Heading>
        <Text textAlign={'justify'}>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by the Company.
        </Text>
        <Text textAlign={'justify'}>
          The Company has no control over, and assumes no responsibility for,
          the content, privacy policies, or practices of any third party web
          sites or services. You further acknowledge and agree that the Company
          shall not be responsible or liable, directly or indirectly, for any
          damage or loss caused or alleged to be caused by or in connection with
          the use of or reliance on any such content, goods or services
          available on or through any such web sites or services.
        </Text>
        <Text textAlign={'justify'}>
          We strongly advise You to read the terms and conditions and privacy
          policies of any third-party web sites or services that You visit.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Termination
        </Heading>
        <Text textAlign={'justify'}>
          We may terminate or suspend Your access immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if You breach these Terms and Conditions.
        </Text>
        <Text textAlign={'justify'}>
          Upon termination, Your right to use the Service will cease
          immediately.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Limitation of Liability
        </Heading>
        <Text textAlign={'justify'}>
          Notwithstanding any damages that You might incur, the entire liability
          of the Company and any of its suppliers under any provision of this
          Terms and Your exclusive remedy for all of the foregoing shall be
          limited to the amount actually paid by You through the Service or 100
          USD if You haven't purchased anything through the Service.
        </Text>
        <Text textAlign={'justify'}>
          To the maximum extent permitted by applicable law, in no event shall
          the Company or its suppliers be liable for any special, incidental,
          indirect, or consequential damages whatsoever (including, but not
          limited to, damages for loss of profits, loss of data or other
          information, for business interruption, for personal injury, loss of
          privacy arising out of or in any way related to the use of or
          inability to use the Service, third-party software and/or third-party
          hardware used with the Service, or otherwise in connection with any
          provision of this Terms), even if the Company or any supplier has been
          advised of the possibility of such damages and even if the remedy
          fails of its essential purpose.
        </Text>
        <Text textAlign={'justify'}>
          Some states do not allow the exclusion of implied warranties or
          limitation of liability for incidental or consequential damages, which
          means that some of the above limitations may not apply. In these
          states, each party's liability will be limited to the greatest extent
          permitted by law.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          "AS IS" and "AS AVAILABLE" Disclaimer
        </Heading>
        <Text textAlign={'justify'}>
          The Service is provided to You "AS IS" and "AS AVAILABLE" and with all
          faults and defects without warranty of any kind. To the maximum extent
          permitted under applicable law, the Company, on its own behalf and on
          behalf of its Affiliates and its and their respective licensors and
          service providers, expressly disclaims all warranties, whether
          express, implied, statutory or otherwise, with respect to the Service,
          including all implied warranties of merchantability, fitness for a
          particular purpose, title and non-infringement, and warranties that
          may arise out of course of dealing, course of performance, usage or
          trade practice. Without limitation to the foregoing, the Company
          provides no warranty or undertaking, and makes no representation of
          any kind that the Service will meet Your requirements, achieve any
          intended results, be compatible or work with any other software,
          applications, systems or services, operate without interruption, meet
          any performance or reliability standards or be error free or that any
          errors or defects can or will be corrected.
        </Text>
        <Text textAlign={'justify'}>
          Without limiting the foregoing, neither the Company nor any of the
          company's provider makes any representation or warranty of any kind,
          express or implied: (i) as to the operation or availability of the
          Service, or the information, content, and materials or products
          included thereon; (ii) that the Service will be uninterrupted or
          error-free; (iii) as to the accuracy, reliability, or currency of any
          information or content provided through the Service; or (iv) that the
          Service, its servers, the content, or e-mails sent from or on behalf
          of the Company are free of viruses, scripts, trojan horses, worms,
          malware, timebombs or other harmful components.
        </Text>
        <Text textAlign={'justify'}>
          Some jurisdictions do not allow the exclusion of certain types of
          warranties or limitations on applicable statutory rights of a
          consumer, so some or all of the above exclusions and limitations may
          not apply to You. But in such a case the exclusions and limitations
          set forth in this section shall be applied to the greatest extent
          enforceable under applicable law.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Governing Law
        </Heading>
        <Text textAlign={'justify'}>
          The laws of the Country, excluding its conflicts of law rules, shall
          govern this Terms and Your use of the Service. Your use of the
          Application may also be subject to other local, state, national, or
          international laws.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Disputes Resolution
        </Heading>
        <Text textAlign={'justify'}>
          If You have any concern or dispute about the Service, You agree to
          first try to resolve the dispute informally by contacting the Company.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          For European Union (EU) Users
        </Heading>
        <Text textAlign={'justify'}>
          If You are a European Union consumer, you will benefit from any
          mandatory provisions of the law of the country in which you are
          resident in.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          United States Legal Compliance
        </Heading>
        <Text textAlign={'justify'}>
          You represent and warrant that (i) You are not located in a country
          that is subject to the United States government embargo, or that has
          been designated by the United States government as a "terrorist
          supporting" country, and (ii) You are not listed on any United States
          government list of prohibited or restricted parties.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Severability and Waiver
        </Heading>
        <Heading
          align={'left'}
          as={'h3'}
          size="sm"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Severability
        </Heading>
        <Text textAlign={'justify'}>
          If any provision of these Terms is held to be unenforceable or
          invalid, such provision will be changed and interpreted to accomplish
          the objectives of such provision to the greatest extent possible under
          applicable law and the remaining provisions will continue in full
          force and effect.
        </Text>
        <Heading
          align={'left'}
          as={'h3'}
          size="sm"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Waiver
        </Heading>
        <Text textAlign={'justify'}>
          Except as provided herein, the failure to exercise a right or to
          require performance of an obligation under these Terms shall not
          effect a party's ability to exercise such right or require such
          performance at any time thereafter nor shall the waiver of a breach
          constitute a waiver of any subsequent breach.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Translation Interpretation
        </Heading>
        <Text textAlign={'justify'}>
          These Terms and Conditions may have been translated if We have made
          them available to You on our Service. You agree that the original
          English text shall prevail in the case of a dispute.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Changes to These Terms and Conditions
        </Heading>
        <Text textAlign={'justify'}>
          We reserve the right, at Our sole discretion, to modify or replace
          these Terms at any time. If a revision is material We will make
          reasonable efforts to provide at least 30 days' notice prior to any
          new terms taking effect. What constitutes a material change will be
          determined at Our sole discretion.
        </Text>
        <Text textAlign={'justify'}>
          By continuing to access or use Our Service after those revisions
          become effective, You agree to be bound by the revised terms. If You
          do not agree to the new terms, in whole or in part, please stop using
          the website and the Service.
        </Text>
        <Heading
          align={'center'}
          as={'h2'}
          size="md"
          color={useColorModeValue('brand.200', 'brand.400')}
        >
          Contact Us
        </Heading>
        <Text textAlign={'justify'}>
          If you have any questions about these Terms and Conditions, You can
          contact us:
        </Text>
        <UnorderedList>
          <ListItem>By email: support@maurer.gg</ListItem>
        </UnorderedList>
      </Box>
    </Stack>
  );
};

const Landing = () => {
  return (
    <Stack p={0} alignItems={'center'}>
      <Heading
        size={useBreakpointValue({ base: '3xl', lg: '3xl' })}
        fontWeight="medium"
        color={useColorModeValue('brand.200', 'brand.400')}
        align="center"
      >
        Welcome to Trackfit!{' '}
      </Heading>
      <Container
        maxW={'container.sm'}
        fontSize={'lg'}
        color={useColorModeValue('brand.200', 'brand.400')}
      >
        <Text align="justify">
          TrackFit is a nutrition and fitness tracking application built in
          Javascript. TrackFit utilizes the Google Drive API service to house
          user data on their Drive and runs completely client side after the
          initial request to TrackFit's servers.
        </Text>
        <Text
          align="left"
          fontWeight={'medium'}
          fontSize={'md'}
        >
          Click the button below to login.
        </Text>
      </Container>
      <GoogleButton scale={3} />
    </Stack>
  );
};
const Authorizing = () => {
  const authClient = useContext(AuthorizationClientContext);

  const handleOnClickRequestAuth = () => {
    authClient.requestAccessToken();
  };

  return (
    <Box
      pt={{ base: '0', lg: '0' }}
      pb={{ base: '12', lg: '24' }}
      minW="100vw"
      h="calc(100vh)"
    >
      <Center
        p={2}
        backgroundColor={useColorModeValue('brand.100', 'brand.200')}
      >
        <Image width="12rem" src="../img/logo.png" />
      </Center>
      <Container maxW={'container.xl'}>
        <Stack spacing={4} align="center">
          <Heading
            align={'center'}
            color={useColorModeValue('brand.200', 'brand.400')}
          >
            Application Authorization
          </Heading>

          <Text align={'justify'}>
            This application uses your Google Drive for storage. Google requires
            that you consent to TrackFit accessing your Google Drive. Please
            click the button below and follow the prompts to do so.
          </Text>
          <Stack>
            <Button size={'md'} onClick={handleOnClickRequestAuth}>
              Request Authorization
            </Button>
          </Stack>

          <Text>To skip this page in the future, please allow popups</Text>
        </Stack>
      </Container>
    </Box>
  );
};
const Initializing = () => {
  return (
    <Box
      pt={{ base: '0', lg: '0' }}
      pb={{ base: '12', lg: '24' }}
      minW="100vw"
      h="calc(100vh)"
    >
      <Center
        p={2}
        backgroundColor={useColorModeValue('brand.100', 'brand.200')}
      >
        <Image width="12rem" src="../img/logo.png" />
      </Center>
      <Container maxW={'container.xl'}>
        <Stack spacing={4} align="center">
          <Heading
            align={'center'}
            color={useColorModeValue('brand.200', 'brand.400')}
          >
            Application Initializing
          </Heading>
        </Stack>
      </Container>
    </Box>
  );
};
