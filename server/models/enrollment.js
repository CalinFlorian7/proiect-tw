module.exports = (sequelize, Datatypes) => {
    const Enrollment = sequelize.define(
        'enrollment',
        {
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                foreignkey: true,
            },
            subject_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                foreignkey: true,
            },
            enrollment_date: {
                type: Datatypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    )
    return Enrollment
}
