import connectDB from "../../../config/database.js";
import Property from "../../../models/Property.js";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    console.log("Property", properties)
    return new Response(JSON.stringify({message:"Hello Search vvv rrr"}), { status: 200, });
  } catch (error) {
    console.log(error, "Failed api");
    return new Response("Something Went Wrong", { status: 500 });
  }
};