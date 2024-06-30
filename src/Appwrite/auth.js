import { Client, Account, ID,Databases, Storage } from "appwrite";


const client = new Client()
    .setEndpoint(process.env.API_ENDPOINT) 
    .setProject(process.env.API_PROJECT_ID);               
 
    
export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client)