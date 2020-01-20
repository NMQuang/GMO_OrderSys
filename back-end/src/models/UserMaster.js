import DataTypes from 'sequelize';
import {
    sequelize
} from '../config/database';
const UserMaster = sequelize.define('user_masters', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const Op = sequelize.Op;
export {
    UserMaster,
    Op
};