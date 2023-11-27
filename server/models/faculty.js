module.exports = (sequelize, Datatypes) => {
    const Faculty = sequelize.define('faculty', {
        faculty_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            extra: 'auto_increment',
        },
        faculty_name: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        university_id: {
            type: Datatypes.INTEGER,
            allowNull: true,
            foreignkey: true,
        },
    })
    return Faculty
}
