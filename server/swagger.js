const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const doc = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test Api ",
      version: "1.0.0",
      description: "List and documentation of all endpoints available in the api"
    }
  },
  apis: ["./routes/posts.routes.js"],
}
const swaggerSpec = swaggerJSDoc(doc)

const swaggerDoc = (app, port) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })
  console.log(`Documentation of the api running in http://localhost:${port}/docs`)
}
module.exports = { swaggerDoc }