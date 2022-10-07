
import { Box, Container, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import './user.css'
import { useHistory } from 'react-router-dom';
const User = () => {
   const history = useHistory()

   useEffect(()=>{
    const user =  JSON.parse(localStorage.getItem('userInfo'))

    if(user) history.push('/home')
   },[history])
   
  return (

   
    <div className='App'>

  <Container maxW="xl" centerContent >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={"2xl"} fontFamily="work sans" mx={"200px"}>
         Workshop
        </Text>
      </Box>
      <Box bg={"white"} w="100%" p={4} borderRadius="lg" borderWidth={"1px"}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb='1em'>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <Login/>
            </TabPanel>
            <TabPanel>
             <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
     </div>
  )
}

export default User
