module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('user', {
        user_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            extra: 'auto_increment',
        },
        user_name: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        user_email: {
            type: Datatypes.STRING,
            allowNull: true,
            unique: true,
        },
        user_password: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        user_image: {
            type: Datatypes.BLOB,
            allowNull: true,
        },
        user_date: {
            type: Datatypes.DATE,
            allowNull: true,
        },
    })
    return User
}
