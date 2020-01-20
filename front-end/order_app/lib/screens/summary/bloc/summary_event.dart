import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../../models/index.dart';
import 'bloc.dart';

@immutable
abstract class SummaryEvent extends Equatable {
  SummaryEvent([List props = const []]) : super(props);
}

class GetSummary extends SummaryEvent {
  GetSummary() : super([]);

  @override
  String toString() => "GetSummary";
}

class SubmitOrder extends SummaryEvent {
  SubmitOrder() : super([]);

  @override
  String toString() => "SubmitOrder";
}

class UpdateState extends SummaryEvent {
  final SummaryState menuDetailState;

  UpdateState({this.menuDetailState}) : super([menuDetailState]);

  @override
  String toString() => 'MenuDetailState { menuDetailState: $menuDetailState }';
}

class InitData extends SummaryEvent {
  final User user;
  final Menu menu;

  InitData({this.user, this.menu}) : super([user, menu]);

  @override
  String toString() => 'InitData { user: $user, menu: $menu  }';
}
