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

app.get("/orders", (req, res) => {
  const { user_id } = req.query;
  const q = `
    SELECT o.*, GROUP_CONCAT(oi.item_id) AS item_ids, GROUP_CONCAT(oi.quantity) AS quantities
    FROM orders AS o
    LEFT JOIN order_items AS oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    GROUP BY o.id
  `;
  db.query(q, [user_id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/order_items", (req, res) => {
  const q = "SELECT * FROM order_items;";
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
  const { user_id, total, items } = req.body;

  // Insert the new order into the orders table
  const q1 =
    "INSERT INTO orders (user_id, total, order_date) VALUES (?, ?, NOW())";
  db.query(q1, [user_id, total], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false });
    }

    const order_id = result.insertId;

    // Insert the order items into the order_items table
    const orderItemValues = items.map((item) => [
      order_id,
      item.item_id,
      item.quantity,
    ]);
    const q2 = "INSERT INTO order_items (order_id, item_id, quantity) VALUES ?";
    db.query(q2, [orderItemValues], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false });
      }

      return res.status(200).json({ success: true, order_id });
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
        const { id, name, email } = user;
        return res.json({ success: true, user: { id, name, email } });
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
    if (!err) {
      db.query(
        "SELECT * FROM users WHERE id = ?",
        result.insertId,
        (error, results) => {
          if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ success: false });
          }
          const user = results[0];
          const { id, name, email } = user;
          return res.json({ success: true, user: { id, name, email } });
        }
      );
    } else {
      console.error("Database error:", err);
      return res.status(500).json({ success: false });
    }
  });
});

const port = 8800;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
