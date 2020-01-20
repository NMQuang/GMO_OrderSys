import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../../models/index.dart';
import 'bloc.dart';

@immutable
abstract class MenuDetailEvent extends Equatable {
  MenuDetailEvent([List props = const []]) : super(props);
}

class SelectProduct extends MenuDetailEvent {
  final int productId;

  SelectProduct({@required this.productId}) : super([productId]);

  @override
  String toString() => "SelectProduct { productId: $productId }";
}

class GetMenuDetail extends MenuDetailEvent {
  GetMenuDetail() : super([]);

  @override
  String toString() => "GetMenuDetail";
}

class SubmitOrder extends MenuDetailEvent {
  SubmitOrder() : super([]);

  @override
  String toString() => "SubmitOrder";
}

class UpdateState extends MenuDetailEvent {
  final MenuDetailState menuDetailState;

  UpdateState({this.menuDetailState}) : super([menuDetailState]);

  @override
  String toString() => 'MenuDetailState { menuDetailState: $menuDetailState }';
}

class InitData extends MenuDetailEvent {
  final User user;
  final Menu menu;

  InitData({this.user, this.menu}) : super([user, menu]);

  @override
  String toString() => 'InitData { user: $user, menu: $menu  }';
}
