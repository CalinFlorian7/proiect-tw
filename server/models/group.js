module.exports = (sequelize, Datatypes) => {
    const Group = sequelize.define(
        'group',
        {
            group_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoincrement: true,
            },
            group_name: {
                type: Datatypes.STRING,
                allowNull: true,
            },
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: true,
                foreignkey: true,
            },
            group_date: {
                type: Datatypes.DATE,
                allowNull: true,
            },
        },
        { timestamps: false }
    )

    return Group
}
