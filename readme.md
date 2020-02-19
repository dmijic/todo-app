'npm run dev' in root
'npm run serve' in client

---

Create
post > http://localhost:5000/api/todos

{
"todoID": "Test ID",
"todoName": "Test name",
"todoText": "Test text"
}

---

Read:
get > http://localhost:5000/api/todos

---

Update
put > http://localhost:5000/api/todos/id

{
"todoID": "Updated Test ID",
"todoName": "Updated Test name",
"todoText": "Updated Test text"
}

---

Delete
delete > http://localhost:5000/api/todos/id

---
