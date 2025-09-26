const express = require("express");
const serviceReportRoutes = require("./routers/formRouter");
const customerRoutes = require("./routers/customerRouter");
const spareRoutes = require("./routers/sparePartsRouter");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/globalErrorHandler");
const app = express();
app.use(cookieParser());
// CORS configuration to allow a specific origin
const corsOptions = {
  origin: [
    "https://react-front-end-tdc7.vercel.app",
    "https://react-front-end-tdc7.vercel.app/"
  ], // Your frontend origin
};
app.use(cors(corsOptions));
const PORT = 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database connection
connectDB();
// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/spares", spareRoutes);
app.use("/api", serviceReportRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
