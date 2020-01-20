import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import 'bloc.dart';

@immutable
abstract class RegisterEvent extends Equatable {
  RegisterEvent([List props = const []]) : super(props);
}

class Submitted extends RegisterEvent {
  final String code, name, password;

  Submitted({
    @required this.code,
    @required this.name,
    @required this.password,
  }) : super([code, name, password]);

  @override
  String toString() =>
      'Submitted { code: $code, name: $name, password: $password }';
}

class UpdateState extends RegisterEvent {
  final RegisterState registerState;

  UpdateState({this.registerState}) : super([registerState]);

  @override
  String toString() => 'UpdateState { registerState: $registerState }';
}
