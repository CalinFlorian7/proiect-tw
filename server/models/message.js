module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'message',
        {
            message_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            message_content: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            membership_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                foreignkey: true,
            },
            note_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                foreignkey: true,
            },
            message_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        { timestamps: false }
    )
    return Message
}
