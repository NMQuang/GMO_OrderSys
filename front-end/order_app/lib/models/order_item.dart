class OderItem {
  int _orderId, _productId, _quantity;

  int get orderId => _orderId;
  int get productId => _productId;
  int get quantity => _quantity;

  set orderId(int orderId) {
    this._orderId = orderId;
  }

  set productId(int productId) {
    this._productId = productId;
  }

  set quantity(int quantity) {
    this._quantity = quantity;
  }
}
