import { createContext, useState } from "react";
import { useEffect } from "react";
import { account } from "../Appwrite/auth";
import { useNavigate } from "react-router-dom";
import { database } from "../Appwrite/auth";
import { useParams } from "react-router-dom";


export const userContext = createContext();

const UserContextProvide = ({children})=>{

    const [userData, setUserData] = useState()
    const [blogs, setBlogs] = useState([])
    const {url} = useParams()
   
    useEffect(() => {
        const getCurrentUser = async () => {
          try {
            const userDetail = await account.get();
            setUserData(userDetail);
            
          } catch (error) {
            
            console.log(error);
          }
        };
        getCurrentUser();
      },[]);

      useEffect(()=>{
        const fatchAllPost =async ()=>{
          try {
            const getPost =await database.listDocuments("65b340358ea3657276f8","65b34045850ba70f6fec");
            setBlogs(getPost.documents.reverse())
            
            
          } catch (error) {
            console.log(error)
          }
        }
        fatchAllPost();
      },[url])

    return(
        <userContext.Provider value={{userData, blogs, setBlogs}}>
            {children}
        </userContext.Provider>
    )
}

export default  UserContextProvide