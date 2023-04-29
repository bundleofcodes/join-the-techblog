//setup imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//setup object
class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            //ensure there is at least one character inside the comment body
            validate: { len: [1] },
        },
        user_id: {
            //post of user
            type: DataTypes.INTEGER,
            allowNullL: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        post_id: {
            //the id of the post it belongs to
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "post",
                key: "id",
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);
//export
module.exports = Comment;