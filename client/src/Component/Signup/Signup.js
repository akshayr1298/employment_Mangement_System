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
import axios from 'axios'
import {useHistory} from 'react-router-dom'



const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading,setLoading] = useState(false)
  const toast = useToast()
  const history = useHistory()
  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true)
    if(pics === undefined){
      toast({
        title:"Please select image",
        status:"warning",
        duration:500,
        isClosable:true,
        position:"top",
      })
      return
    }
    console.log(pics);
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData()
      data.append("file",pics)
      data.append("upload_preset","Saas-product")
      data.append("cloud_name","dtzmkksbq")
      fetch("https://api.cloudinary.com/v1_1/dtzmkksbq/image/upload",{ 
        method:"post",
        body:data,

      }).then((res)=>res.json()).then(data=>{
        setPic(data.url.toString())
        console.log(data.url.toString());
        setLoading(false)
      }).catch((err)=>{
        console.log(err);
        setLoading(false)
      })
  }else{
    toast({
      title:"please select an image",
      status:"warning",
      duration:5000,
      isClosable:true,
      position:"top"
    })
    setLoading(false)
    return
  }
}
  const handleSignup = async() => {
    setLoading(true)
    if(!name||!email||!password||!confirmpassword){
      toast({
        title:"please fill all fields",
        status:"warning",
        isClosable:true,
        position:"top"
      })
      setLoading(false)
      return
    }
    if(password!==confirmpassword){
      toast({
        title:"passwords do not amtch",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      return
    }

  try {
    console.log(name, email, password, pic);
   const config={headers: {
    'Content-Type': 'application/json'
  }}
    
    const data = await axios.post("/api/user",{name,email,password,pic},config)
    console.log('res',data);
     toast({
        title:"signup succesful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      localStorage.setItem('userInfo',JSON.stringify(data))
      setLoading(false)
      history.push('/home')

  } catch (error) {
    toast({
        title:"Error occured",
        description:error.response.data.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      setLoading(false)

    
  }

  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            value={confirmpassword}
            type={show ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75" size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          
          type={"file"}
          p={1.5}
          accept="image/*"
          onChange={(e) =>  postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSignup}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
