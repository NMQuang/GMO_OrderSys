import 'package:equatable/equatable.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';

import '../../models/index.dart' show User;

@immutable
abstract class UserState extends Equatable {
  final User user;

  UserState(this.user, [List props = const []]) : super(props);
}

class AuthenticationUninitialized extends UserState {
  AuthenticationUninitialized(User user) : super(user, []);

  @override
  String toString() => 'AuthenticationUninitialized { user: $user }';
}

class AuthenticationAuthenticated extends UserState {
  AuthenticationAuthenticated(User user) : super(user, []);

  @override
  String toString() => 'AuthenticationAuthenticated { user: $user }';
}
