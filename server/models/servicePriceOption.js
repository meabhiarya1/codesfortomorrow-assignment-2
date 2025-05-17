module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ServicePriceOption', {
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        type: {
            type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
            allowNull: false
        }
    });
};
