import 'index.dart';

class ProductSummary {
  Product _product;
  List<User> _users;

  ProductSummary(Product product, List<User> users)
      : _product = product,
        _users = users;

  Product get product => _product;
  List<User> get users => _users;

  set users(List<User> users) => this._users = users;
  set product(Product product) => this._product = product;

  // Summary.fromJson(Map<String, dynamic> json)
  //     : _id = json['id'],
  //       _name = json['name'],
  //       _role = json['role'],
  //       _accessToken = json['accessToken'];

  @override
  String toString() => 'Summary { product: $_product, users: $_users }';
}
