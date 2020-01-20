import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../models/index.dart' show User;

@immutable
abstract class UserAction extends Equatable {
  UserAction([List props = const []]) : super(props);
}

class AddUserAction extends UserAction {
  final User user;

  AddUserAction(this.user);

  @override
  String toString() => 'AddUserAction';
}

class RemoveUserAction extends UserAction {
  final int userId;

  RemoveUserAction(this.userId);

  @override
  String toString() => 'RemoveUserAction';
}
