import DataTypes from 'sequelize';
import {
    sequelize
} from '../config/database';
import {
    Menu
} from './Menu';


const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
    },
    menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false,
});

Menu.hasMany(Order, {
    foreignKey: 'menu_id',
    sourceKey: 'id'
});
Order.belongsTo(Menu, {
    foreignKey: 'menu_id',
    targetKey: 'id'
});

export {
    Order
};