import { app } from "./controllers/app";
import { userRouter } from "./routes/userRoute";

app.use("/user", userRouter);