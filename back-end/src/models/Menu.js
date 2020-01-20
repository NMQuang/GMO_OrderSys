import DataTypes from 'sequelize';
import {
    sequelize
} from '../config/database';
import {
    Product
} from './Product';

const Menu = sequelize.define('menus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
    },
    valid_from: {
        type: DataTypes.DATE,
    },
    valid_to: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false,
});

Menu.hasMany(Product, {
    foreignKey: 'menu_id',
    sourceKey: 'id'
});
Product.belongsTo(Menu, {
    foreignKey: 'menu_id',
    targetKey: 'id'
});

export {
    Menu
};