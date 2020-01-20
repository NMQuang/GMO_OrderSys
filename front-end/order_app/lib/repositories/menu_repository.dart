import 'package:flutter/foundation.dart';
import 'package:rxdart/rxdart.dart';

import '../models/index.dart';
import '../providers/index.dart';

class MenuRepository {
  final MenuProvider _menuProvider;

  MenuRepository(this._menuProvider);

  Subject<List<Menu>> getAllMenu({@required String token}) =>
      _menuProvider.getAllMenu(token: token);

  Subject<List<Product>> getMenuDetail({
    @required String token,
    @required int menuId,
  }) =>
      _menuProvider.getMenuDetail(token: token, menuId: menuId);

  Subject<List<ProductSummary>> getSummary({
    @required String token,
    @required int menuId,
  }) =>
      _menuProvider.getSummary(token: token, menuId: menuId);
}
