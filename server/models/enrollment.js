module.exports = (sequelize, Datatypes) => {
    const Enrollment = sequelize.define(
        'enrollment',
        {
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                primaryKey: true,
            },
            subject_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                primaryKey: true,
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
