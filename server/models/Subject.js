module.exports = (sequelize, Datatypes) => {
    const Subject = sequelize.define(
        'subject',
        {
            subject_name: {
                type: Datatypes.STRING,
                allowNull: true,
            },
            subject_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            teacher_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
        },
        {
            timestamps: false,
        }
    )

    return Subject
}
