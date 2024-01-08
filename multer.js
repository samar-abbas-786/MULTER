const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express());

app.set("view engine", "ejs");
app.set("/views", path.resolve("views"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("home");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("ProfileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(upload.path);

  return res.redirect("/");
});

app.listen(PORT, (req, res) => {
  console.log(`App is running on :${PORT}`);
});
