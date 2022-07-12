import { app } from "./controllers/app";
import { movieRouter } from "./routes/movieRoute";
import { userRouter } from "./routes/userRoute";

app.use("/user", userRouter);
app.use("/movie", movieRouter);