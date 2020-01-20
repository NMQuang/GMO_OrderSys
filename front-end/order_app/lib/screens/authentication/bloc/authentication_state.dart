import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../../models/index.dart';

@immutable
abstract class AuthenticationState extends Equatable {
  final User user;
  AuthenticationState(this.user, [List props = const []]) : super(props);
}

class Uninitialized extends AuthenticationState {
  Uninitialized(User user) : super(user, []);

  @override
  String toString() => 'Uninitialized { user: $user }';
}

class Authenticated extends AuthenticationState {
  Authenticated(User user) : super(user, []);

  @override
  String toString() => 'Authenticated { user: $user }';
}

class Unauthenticated extends AuthenticationState {
  Unauthenticated(User user) : super(user, []);

  @override
  String toString() => 'Unauthenticated { user: $user }';
}

class Authenticating extends AuthenticationState {
  Authenticating(User user) : super(user, []);

  @override
  String toString() => 'Authenticating { user: $user }';
}
