const registerRoutes = app => {
  filesRoutes(app);
  studentsRoutes(app);
}

const filesRoutes = app => {
  app.get("/files/{code}/status",() => console.log("getting file status"));
}

const studentsRoutes = app => {
  app.get("/students",() => console.log("getting student"));
  app.put("/students", () => console.log("putting student"));
  app.post("/students", () => console.log("updating student"));
  app.delete("/students", () => console.log("deleting student"));
}

module.exports = { registerRoutes }
