import { createContext, useState } from "react";
import { useEffect } from "react";
import { account } from "../Appwrite/auth";
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
            const getPost =await database.listDocuments(process.env.API_DATABASE_ID,process.env.API_COLLECTION_ID);
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