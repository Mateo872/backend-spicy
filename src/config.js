import "dotenv/config";

const PASSWORD = process.env.PASSWORD;

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://bellinimateo872:${PASSWORD}@cluster0.dfpjt6n.mongodb.net/?retryWrites=true&w=majority`;
