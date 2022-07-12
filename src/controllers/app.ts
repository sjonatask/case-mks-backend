require("dotenv").config();
import { AddressInfo } from "net";
import express = require('express');
import { AppDataSource } from "../data-source";

AppDataSource
.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

export const app = express();
app.use(express.json());

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server runing in http://localhost:${address.port}`);
  } else {
    console.error(`Error during server initialization`);
  }
});