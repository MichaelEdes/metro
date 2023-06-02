import express from "express";
import mysql from "mysql";
import cors from "cors";
import url from "url";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306, // Specify the port if it's not the default one (3306)
  user: "root",
  password: "", // Replace with your actual password
  database: "metro_data",
});

app.get("/items", (req, res) => {
  const q = `
    SELECT i.*, GROUP_CONCAT(a.allergen_name) AS allergens
    FROM items AS i
    LEFT JOIN item_allergens AS ia ON i.id = ia.item_id
    LEFT JOIN allergens AS a ON ia.allergen_id = a.id
    GROUP BY i.id
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/order_items", (req, res) => {
  const q = "SELECT * FROM ORDER_ITEMS;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/orders", (req, res) => {
  const { userId, total, items } = req.body;

  const orderQuery =
    "INSERT INTO orders (order_date, total, user_id) VALUES (NOW(), ?, ?)";

  // Insert order into the orders table
  db.query(orderQuery, [total, userId], (err, data) => {
    if (err) return res.status(500).json(err);

    const orderID = data.insertId;

    // Insert order items into the order_items table
    const orderItemsQuery =
      "INSERT INTO order_items (order_id, sandwich_id, sandwich_name, quantity, price) VALUES ?";
    const orderItemsValues = items.map((item) => [
      orderID,
      item.id,
      item.name,
      item.quantity,
      item.price,
    ]);

    db.query(orderItemsQuery, [orderItemsValues], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Order submitted successfully");
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json(err);
    }

    if (data.length > 0) {
      const user = data[0];
      const passwordMatch = bcrypt.compareSync(password, user.password); // Compare passwords

      if (passwordMatch) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } else {
      return res.json({ success: false });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

  const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(q, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false });
    }
    return res.json({ success: true });
  });
});

const port = 8800;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
