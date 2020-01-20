import DataTypes from 'sequelize';
import {
    sequelize
} from '../config/database';
const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('Admin', 'User')
    }
}, {
    timestamps: false
});

const Op = sequelize.Op;
export {
    User,
    Op
};