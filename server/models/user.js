module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define(
        'user',
        {
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                extra: 'auto_increment',
            },
            user_name: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            user_email: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
            },

            user_password: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            user_image: {
                type: Datatypes.BLOB,
                allowNull: true,
            },
            user_date: {
                type: Datatypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: false, // Disable timestamps
        }
    )
    return User
}
