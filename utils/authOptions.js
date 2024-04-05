import GoogleProvider from "next-auth/providers/google";
import connectDB from "../config/database";
import User from "../models/User"


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks : {
    async signIn({profile}) {
      //connect database
      await connectDB();
      // check if user exits or not
      const userExists = await User.findOne({ email: profile.email });
      // if not then user add
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },

    async session({session}) {
      // get user from data base
      const user = await User.findOne({ email: session.user.email });
      // assogn user id to session
      session.user.id = user._id.toString();
      // return that session
      return session;
    }
  }
}