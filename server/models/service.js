module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Service', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        type: {
            type: DataTypes.ENUM('Normal', 'VIP'),
            allowNull: false
        }
    });
};
