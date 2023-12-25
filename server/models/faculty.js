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

    // Faculty.associate = (models) => {
    //     Faculty.hasMany(models.teacher, {
    //         foreignKey: 'faculty_id',
    //     })
    //     Faculty.belongsTo(models.university, {
    //         foreignKey: 'university_id',
    //     })
    // }

    return Faculty
}
