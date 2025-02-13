require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { sequelize } = require('./config/database');

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado ao PostgreSQL');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar no banco de dados:', error);
    }
})();
