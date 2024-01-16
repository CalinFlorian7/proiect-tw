module.exports = (sequelize, DataTypes) => {
    const Membership = sequelize.define(
        'membership',
        {
            membership_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            membership_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    )
    return Membership
}
