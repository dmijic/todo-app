const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get
router.get("/", async (req, res) => {
  const todos = await loadTodosCollection();
  res.send(await todos.find({}).toArray());
});

//Get one
router.get("/:id", async (req, res) => {
  const todos = await loadTodosCollection();
  res.send(await todos.findOne({ _id: new mongodb.ObjectID(req.params.id) }));
});

// Add
router.post("/", async (req, res) => {
  const todos = await loadTodosCollection();
  await todos.insertOne({
    todoID: req.body.todoID,
    todoName: req.body.todoName,
    todoText: req.body.todoText,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Put
router.put("/:id", async (req, res) => {
  const todos = await loadTodosCollection();
  await todos.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    {
      $set: {
        todoID: req.body.todoID,
        todoName: req.body.todoName,
        todoText: req.body.todoText,
        createdAt: new Date()
      }
    }
  );
  res.status(201).send();
});

// Delete
router.delete("/:id", async (req, res) => {
  const todos = await loadTodosCollection();
  await todos.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadTodosCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://admin:Admin123$@ds337718.mlab.com:37718/mevn-todo-db",
    { usenewUrlParser: true }
  );

  return client.db("mevn-todo-db").collection("todos");
}

module.exports = router;
