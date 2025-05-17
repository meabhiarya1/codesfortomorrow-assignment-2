
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: "localhost",
        dialect: "mysql",
        logging: false,
    }
);

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('✅ Database connected.'))
    .catch((err) => console.error('❌ Unable to connect:', err));

// Import models
const User = require('./models/user')(sequelize, DataTypes);
const Category = require('./models/category')(sequelize, DataTypes);
const Service = require('./models/service')(sequelize, DataTypes);
const ServicePriceOption = require('./models/servicePriceOption')(sequelize, DataTypes);

// Define associations
Category.hasMany(Service, { onDelete: 'CASCADE' });
Service.belongsTo(Category);

Service.hasMany(ServicePriceOption, { onDelete: 'CASCADE' });
ServicePriceOption.belongsTo(Service);

// Export models and sequelize instance
module.exports = {
    sequelize,
    Sequelize,
    User,
    Category,
    Service,
    ServicePriceOption
};
