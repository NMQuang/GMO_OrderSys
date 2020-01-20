import DataTypes from 'sequelize';
import {
    sequelize
} from '../config/database';

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    menu_id: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    note: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: false,
});

export {
    Product
};