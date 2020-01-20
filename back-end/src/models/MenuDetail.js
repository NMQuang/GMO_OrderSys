import DataTypes from 'sequelize';
import {
    sequelize
} from '../config/database';
import {
    Product
} from './Product';
import {
    Menu
} from './Menu';

const MenuDetail = sequelize.define('menu_details', {
    menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
});

Product.hasMany(MenuDetail, {
    foreignKey: 'product_id',
    sourceKey: 'id'
});
MenuDetail.belongsTo(Product, {
    foreignKey: 'product_id',
    targetKey: 'id'
});

Menu.hasMany(MenuDetail, {
    foreignKey: 'menu_id',
    sourceKey: 'id'
});
MenuDetail.belongsTo(Menu, {
    foreignKey: 'menu_id',
    targetKey: 'id'
});
export {
    MenuDetail
};