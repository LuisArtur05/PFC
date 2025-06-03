const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

app.use(cors());
app.use(express.json());

// Simulamos base de datos en memoria
const usersDB = [
  {
    id: 1,
    email: "dam@gmail.com",
    passwordHash: "$2a$10$z4aYoLIW9/TH4/0kPpIvUeRxGfO5BB0G5kOn2pxa0fJnyvJQrFXeK", // hash de "123"
  },
];

app.post("/usuario/getID", async (req, res) => {
  const { email, password } = req.body;

  const user = usersDB.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ error: "Contraseña incorrecta" });

  res.json(user.id);
});

app.listen(8080, () => {

});
