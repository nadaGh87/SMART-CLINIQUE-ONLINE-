const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3003', credentials: true }));

// Connexion à la base de données
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "login_db",
    password: ""
});

// Gestionnaire d'erreurs pour la connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error("Erreur lors de la connexion à la base de données : ", err.message);
        process.exit(1); // Arrêter le serveur si la connexion échoue
    }
    console.log("Connexion à la base de données réussie !");
});

// Fonction pour récupérer les informations d'un administrateur
const log = async (email) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    try {
        const admins = await new Promise((resolve, reject) => {
            db.query(sql, [email], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return admins.length > 0 ? admins[0] : null;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

// Route de connexion
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    try {
        const admin = await log(email); // Attendre le résultat de la fonction log
        if (!admin) {
            return res.status(404).json({ message: "Adresse email incorrecte." });
        }

        // Vérification du mot de passe
        if (admin.password === password) {
            // Si l'authentification réussit, on renvoie une réponse avec un indicateur de succès
            return res.json({
                message: "Connexion réussie",
                redirect: "/home", // Indiquer au frontend où rediriger
                role: admin.role
            });
        } else {
            return res.status(403).json({ message: "Mot de passe incorrect." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

// 1. Récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    const { email, password } = req.headers; // Admin credentials in headers

    // Vérification des informations d'identification de l'administrateur
    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    try {
        const admin = await log(email); // Get admin info from DB

        if (!admin || admin.password !== password) {
            return res.status(403).json({ message: "Accès refusé. Identifiants d'administrateur invalides." });
        }

        const sql = "SELECT id, first_name, last_name, email,role FROM users";
        db.query(sql, (err, data) => {
            if (err) return res.status(500).json({ message: "Database error" });

            if (data.length > 0) {
                return res.json({ users: data });
            } else {
                return res.status(404).json({ message: "Aucun utilisateur trouvé dans la base de données." });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
});


app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { email, password, role } = req.body;
  
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
  
    const sql = 'UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?';
    db.query(sql, [email, password, role, userId], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', err.message);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      return res.json({ message: 'Utilisateur mis à jour avec succès.' });
    });
  });
 
  
//delete

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err.message);
        return res.status(500).json({ message: 'Error deleting user.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return res.json({ message: 'User deleted successfully.' });
    });
  });
  
   // add user 
   