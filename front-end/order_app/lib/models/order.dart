import 'index.dart';

class Order {
  int _id;
  int _quantity;
  Product _product;

  int get id => _id;
  int get quantity => _quantity;
  Product get product => _product;

  set id(int id) => this._id = id;
  set quantity(int quantity) => this._quantity = quantity;
  set product(Product product) => this._product = product;

  Order.fromJson(Map<String, dynamic> json)
      : _id = json['order_id'],
        _quantity = json['quantity'],
        _product = Product.fromJson(json['product']);

  @override
  String toString() =>
      'Order { id: $_id, quantity: $_quantity, product: $_product }';
}
