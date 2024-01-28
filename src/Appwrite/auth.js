import { Client, Account, ID,Databases, Storage } from "appwrite";


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('65b33d8f92a812d28162');               
 
    
export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client)