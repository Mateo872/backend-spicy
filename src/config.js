import "dotenv/config";

const PASSWORD = process.env.PASSWORD;

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://bellinimateo872:${PASSWORD}@spicy.9cehl5g.mongodb.net/spicy-basics`;
