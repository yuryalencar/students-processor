const {
  getFileStatus,
  consumeFileQueue,
  publishFileInQueue,
} = require('../controllers/FileController');

const {
  seeAll,
  deleteStudent,
  updateStudent,
  searchStudent,
} = require('../controllers/StudentController');

const registerRoutes = app => {
  filesRoutes(app);
  studentsRoutes(app);
}

const filesRoutes = app => {
  app.get("/files/:code/status", getFileStatus);
}

const studentsRoutes = app => {
  app.get("/students", seeAll);
  app.get("/students/:cpf", searchStudent);
  app.put("/students/:cpf", updateStudent);
  app.post("/students", publishFileInQueue);
  app.delete("/students/:cpf", deleteStudent);
}

module.exports = { registerRoutes, consumeFileQueue }
