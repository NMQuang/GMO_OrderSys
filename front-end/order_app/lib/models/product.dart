class Product {
  int _id, _quantity;
  String _name, _image, _note;
  DateTime _createdAt;

  Product(
    int id,
    int quantity,
    String name,
    String image,
    String note,
    DateTime createdAt,
  )   : _id = id,
        _quantity = quantity,
        _name = name,
        _image = image,
        _note = note,
        _createdAt = createdAt;

  int get id => _id;
  int get quantity => _quantity;
  String get name => _name;
  String get image => _image;
  String get note => _note;
  DateTime get createdAt => _createdAt;

  set id(int id) {
    this._id = id;
  }

  set quantity(int quantity) {
    this._quantity = quantity;
  }

  set name(String name) {
    this._name = name;
  }

  set image(String image) {
    this._image = image;
  }

  set note(String note) {
    this._note = note;
  }

  set createdAt(DateTime createdAt) {
    this._createdAt = createdAt;
  }

  Product.fromJson(Map<String, dynamic> json)
      : _id = json['id'],
        _quantity = json['quantity'],
        _name = json['name'],
        _image = json['image'],
        _note = json['note'],
        _createdAt = DateTime.parse(json['created_at']);
}
