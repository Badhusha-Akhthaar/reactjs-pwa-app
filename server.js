const express = require("express");
const path = require("path");
const cors = require("cors")
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const port = process.env.PORT || 4003;
app.use(cors())
app.use(express.static(path.join(__dirname, "build")));
app.use(
  "/odata",
  createProxyMiddleware({
    target: "http://10.134.2.110:8000/",
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
    pathRewrite: {
      "^/odata/driver": "/sap/opu/odata/sap/ZTMSTRROOT_C_CDS",
    },
  })
);
app.use("*", express.static(path.join(__dirname, "build", "index.html")));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
