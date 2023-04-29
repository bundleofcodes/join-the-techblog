//setup imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { extend } = require("lodash");
const { beforeCreate, beforeUpdate } = require("../config/connection");

//setup object
class User extends Model {
    //check passwords
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //validate if email is valid
            validate: { isEmail: true},
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            //confirm password is at least 5 char
            validate: { len: [5] },
        },
    },

    {
        //Add bcrypt hooks here in the future to hash paasword being put into db
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //when we send in an update command
            async beforeUpdate(newUserData) {
                newUserData.password = await bcrypt.hash(
                    updatedUserData.password,
                    10
                );
                return updatedUserData;
            },
        },
       //pass in our imported sequelize connection
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       modelName: "user", 
    }
);

module.exports = User;