
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const authOptions = {
    providers : [
        CredentialsProvider  ({
         name : "credentials",
         credentials: {},

         async autorize(credentials) {
            const user = {id: "1" } ;
            return user;
         },
     }), 
    ],
    Session : {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        singIn: "/",
    },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};