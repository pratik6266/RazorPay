import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from '@/lib/db'
import userModel from '@/models/User';
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'Credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          throw new Error("Invalid Credentials"); 
        }
        try {
          await connectDb();
          const user = await userModel.findOne({
            email: credentials?.email,
          })

          if(!user){
            throw new Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(credentials?.password, user.password);

          if(!isValid){
            throw new Error("Invalid Password");
          }

          return user;
        } catch (error) {
          console.error("Error while authorizing", error);
          throw new Error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user){
        token.id = user?.id?.toString();
        token.email = user?.email;
        token.role = user?.role;
      }
      return token
    },
    async session({ session, token }) {
      if(token){
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session
    },
  }, 
  pages: {
    signIn: "/login",
    error: "login"
  },
  session: {
    strategy: 'jwt',
    maxAge: 30*24*60*69
  },
  secret: process.env.NEXTAUTH_SECRET
}