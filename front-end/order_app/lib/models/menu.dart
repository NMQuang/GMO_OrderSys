class Menu {
  int _id, _productQuantity;
  DateTime _createdAt, _validFrom, _validTo;

  Menu(int id, DateTime createdAt, DateTime validFrom, DateTime validTo)
      : _id = id,
        _createdAt = createdAt,
        _validFrom = validFrom,
        _validTo = validTo;

  int get id => _id;
  int get productQuantity => _productQuantity;
  DateTime get createdAt => _createdAt;
  DateTime get validFrom => _validFrom;
  DateTime get validTo => _validTo;
  bool get valid =>
      _validFrom.day <= DateTime.now().day && validTo.day >= DateTime.now().day;

  set id(int id) {
    this._id = id;
  }

  set productQuantity(int productQuantity) {
    this._productQuantity = productQuantity;
  }

  set createdAt(DateTime createdAt) {
    this._createdAt = createdAt;
  }

  set validFrom(DateTime validFrom) {
    this._validFrom = validFrom;
  }

  set validTo(DateTime validTo) {
    this._validTo = validTo;
  }

  Menu.fromJson(Map<String, dynamic> json)
      : _id = json['id'],
        _productQuantity = json['product'],
        _createdAt = DateTime.parse(json['created_at']),
        _validFrom = DateTime.parse(json['valid_from']),
        _validTo = DateTime.parse(json['valid_to']);

  @override
  String toString() =>
      'Menu { id: $_id, createdAt: $_createdAt, validFrom: $_validFrom, validTo: $_validTo }';
}
