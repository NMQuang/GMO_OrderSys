import 'package:meta/meta.dart';

import '../../../models/index.dart';

@immutable
// abstract class MenuDetailState extends Equatable {
abstract class MenuDetailState {
  final List<ItemList> itemList;

  MenuDetailState(this.itemList) : super();
}

class InitialMenuDetail extends MenuDetailState {
  InitialMenuDetail(List<ItemList> itemList) : super(itemList);

  @override
  String toString() => "InitialMenuDetailState";
}

class LoadedMenuDetail extends MenuDetailState {
  LoadedMenuDetail(List<ItemList> itemList) : super(itemList);

  @override
  String toString() => "LoadedMenuDetailState";
}

class LoadingMenuDetail extends MenuDetailState {
  LoadingMenuDetail(List<ItemList> itemList) : super(itemList);

  @override
  String toString() => "LoadingMenuDetail";
}

///
class ItemList {
  Product product;
  bool selected;

  ItemList({this.product, this.selected});
}
