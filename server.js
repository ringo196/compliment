// const express = require("express");
import express from "express";

const app = express();

const port = 8080;

app.listen(port, () =>
  console.log(`Your server has connected and is listening on port: ${port}!!`)
  
);
