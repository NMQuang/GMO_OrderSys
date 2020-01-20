import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:order_app/redux/states/index.dart';

import 'bloc.dart';

@immutable
abstract class AuthenticationEvent extends Equatable {
  AuthenticationEvent([List props = const []]) : super(props);
}

class LoggedIn extends AuthenticationEvent {
  final String code, password;

  LoggedIn({
    @required this.code,
    @required this.password,
  }) : super([code, password]);

  @override
  String toString() => 'LoggedIn { code: $code, password: $password }';
}

class UserStateOnChange extends AuthenticationEvent {
  final UserState userState;

  UserStateOnChange({@required this.userState}) : super([userState]);

  @override
  String toString() => 'UserStateOnChange { userState: $userState }';
}

class UpdateState extends AuthenticationEvent {
  final AuthenticationState authenticationState;

  UpdateState({this.authenticationState}) : super([authenticationState]);

  @override
  String toString() => 'UpdateState { userState: $authenticationState }';
}
