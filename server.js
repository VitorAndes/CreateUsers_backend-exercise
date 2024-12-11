import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors("http://localhost:5173"));

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(201).json({ message: "Usuário deletado com sucesso!" });
});

app.get("/users", async (req, res) => {
  let users = [];

  if (!req.query) {
    users = await prisma.user.findMany();
  }

  users = await prisma.user.findMany({
    where: {
      name: req.query.name,
      age: req.query.age,
      email: req.query.email,
    },
  });

  res.status(200).json(users);
});

app.listen({
  port: 3333,
});
