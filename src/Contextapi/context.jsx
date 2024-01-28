import { createContext, useState } from "react";
import { useEffect } from "react";
import { account } from "../Appwrite/auth";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

const UserContextProvide = ({children})=>{

    const [userData, setUserData] = useState()
   
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

     

    return(
        <userContext.Provider value={{userData}}>
            {children}
        </userContext.Provider>
    )
}

export default  UserContextProvide