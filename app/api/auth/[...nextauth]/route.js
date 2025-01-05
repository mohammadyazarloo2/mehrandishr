import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          await connectMongoDB();
          const { type, email, phone, password, verificationCode } =
            credentials;
          let user;

          console.log("Found user:", {
            found: !!user,
            hasCode: user?.verificationCode === verificationCode,
          });

          switch (type) {
            case "email":
              // Find user with matching email and verification code
              user = await User.findOne({
                email,
                verificationCode: verificationCode,
              });

              if (user) {
                // Update user status after successful verification
                user.emailVerified = true;
                user.verificationCode = undefined;
                user.verificationExpires = undefined;
                await user.save();
                return user;
              }
              break;

            case "password":
              user = await User.findOne({
                $or: [{ email }, { name: email }],
              });

              if (user && (await bcrypt.compare(password, user.password))) {
                return user;
              }
              break;
          }
          return null;
        } catch (error) {
          console.log("Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectMongoDB();
        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create new user if doesn't exist
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
        return true;
      } catch (error) {
        console.log("SignIn Error:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user, session, trigger }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "update") {
        return { ...token, name: session };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/pages/Signin',
    error: '/pages/Signin'
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
