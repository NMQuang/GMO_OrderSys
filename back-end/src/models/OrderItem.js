import DataTypes from 'sequelize';
import {
    sequelize
} from '../config/database';
import {
    Product
} from './Product';
import {
    Order
} from './Order';

const OrderItem = sequelize.define('order_items', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
});

Product.hasMany(OrderItem, {
    foreignKey: 'product_id',
    sourceKey: 'id'
});
OrderItem.belongsTo(Product, {
    foreignKey: 'product_id',
    targetKey: 'id'
});

Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    sourceKey: 'id'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
    targetKey: 'id'
});

export {
    OrderItem
};