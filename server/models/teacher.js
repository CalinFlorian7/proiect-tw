module.exports = (sequelize, Datatypes) => {
    const Teacher = sequelize.define(
        'teacher',
        {
            faculty_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                foreignKey: true,
            },
            teacher_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                extra: 'auto_increment',
            },
            teacher_name: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            email: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
            },
            teacher_password: {
                type: Datatypes.STRING,
                allowNull: false,
            },
            teacher_image: {
                type: Datatypes.BLOB,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    )

    // Teacher.associate = (models) => {
    //     Teacher.belongsTo(models.faculty, {
    //         foreignKey: 'faculty_id',
    //     })
    // }
    return Teacher
}
