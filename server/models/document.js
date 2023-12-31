module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define(
        'document',
        {
            document_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                extra: 'auto_increment',
            },
            document_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            document_path: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
            note_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                foreignkey: true,
            },
        },
        { timestamps: false }
    )

    return Document
}
