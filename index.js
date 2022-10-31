const express = require("express");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const url = "your mongodb url";
const swagger = require("./config/swagger.json");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const http = require("http");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
const username = "CertificateUser";

let server = http.createServer(app).listen(process.env["PORT"] || 3001, async function () {
    try {
      await mongoose.connect(`mongodb+srv://${encodeURIComponent(username)}@cluster0.nj1uo.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`,
        {
          ssl: true,
          sslKey: `${__dirname}/config/rootCA.pem`,
          sslCert: `${__dirname}/config/rootCA.pem`,
        }
      );
      console.log("Server started on port " + (process.env["PORT"] ? process.env["PORT"] : 3001));
    } catch (e) {
      console.error(e);
    }
  });

router.router(app);

module.exports = { server, mongoose };
