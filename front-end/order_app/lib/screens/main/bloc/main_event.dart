import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../../models/index.dart';

@immutable
abstract class MainEvent extends Equatable {
  MainEvent([List props = const []]) : super(props);
}

class GetAllMenu extends MainEvent {
  GetAllMenu() : super([]);

  @override
  String toString() => "GetAllMenu";
}

class InitData extends MainEvent {
  final User user;

  InitData({@required this.user}) : super([user]);

  @override
  String toString() => "InitData { user: $user }";
}
