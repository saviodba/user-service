import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    logging: false,
    dialectOptions: {
        connectTimeout: 10000, // 10 seconds
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 30 seconds
        idle: 10000, // 10 seconds
    },
    define: {
        timestamps: true, // Desabilita os campos createdAt e updatedAt
        underscored: true, // Converte camelCase para snake_case
    },
    
});

sequelize.authenticate().then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});

