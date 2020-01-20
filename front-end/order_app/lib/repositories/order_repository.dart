import 'package:flutter/foundation.dart';
import 'package:rxdart/rxdart.dart';

import '../models/index.dart';
import '../providers/index.dart';

class OrderRepository {
  final OrderProvider _orderProvider;

  OrderRepository(this._orderProvider);

  Subject<Order> getOrder({
    @required String token,
    @required int userId,
    @required int menuId,
  }) =>
      _orderProvider.getOrder(token: token, userId: userId, menuId: menuId);

  Subject<bool> createOrder({
    @required String token,
    @required int userId,
    @required int menuId,
    @required int productId,
  }) =>
      _orderProvider.createOrder(
        token: token,
        userId: userId,
        menuId: menuId,
        productId: productId,
      );

  Subject<bool> updateOrder({
    @required String token,
    @required int orderId,
    @required int menuId,
    @required int productId,
  }) =>
      _orderProvider.updateOrder(
        token: token,
        orderId: orderId,
        menuId: menuId,
        productId: productId,
      );
}
