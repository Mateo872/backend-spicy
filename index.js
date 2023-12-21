import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/user.routes";
import productRoutes from "./src/routes/product.routes";
import adminRoutes from "./src/routes/admin.routes";
import paymentRoutes from "./src/routes/payment.routes";
import "./src/database/dbConnection";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("corriendo en port:", app.get("port"));
});

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/apiSpicy", userRoutes);
app.use("/apiSpicy/admin", adminRoutes);
app.use("/apiSpicy/product", productRoutes);
app.use("/apiSpicy/payment", paymentRoutes);
