import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import {useHistory} from 'react-router-dom'

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleClick = () => setShow(!show);
  const toast = useToast()
  const [loading,setLoading] = useState(false)
  const history = useHistory()

  const handleLogin = async() => {

    setLoading(true);
    if(!email || !password){
      toast({
        title:"Please fill all the field",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
        
      })
      setLoading(false)
      return
    }
    console.log(email, password);
    try {
      const config = {
        header:{
          "Content-type":"application/json"
        }
      }
      const {data} = await axios.post("/api/user/login",{email,password},config)

      toast({
        title:"Login successful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      console.log(JSON.stringify(data));
      localStorage.setItem("userInfo",JSON.stringify(data))
      setLoading(false)
      history.push("/home")
      
    } catch (error) {
      toast({
        title:"Error Occured",
        description:error.response.data.message,
        status:'error',
         duration: 5000,
        isClosable:true,
        position:'top'
      })
      setLoading(false)     
    }    
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75" size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleLogin}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
