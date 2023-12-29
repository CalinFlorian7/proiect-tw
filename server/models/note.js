module.exports = (sequelize, Datatypes) => {
    const Note = sequelize.define(
        'note',
        {
            note_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            note_title: {
                type: Datatypes.STRING,
                allowNull: true,
            },
            note_date: {
                type: Datatypes.DATE,
                allowNull: true,
            },
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            subject_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            note_text: {
                type: Datatypes.LONGTEXT,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    )
    return Note
}
