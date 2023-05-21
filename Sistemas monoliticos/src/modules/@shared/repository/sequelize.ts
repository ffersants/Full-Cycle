import { Sequelize } from "sequelize-typescript";

const sequelize= new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
});

export default sequelize