import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class RegisterState extends Equatable {
  RegisterState([List props = const []]) : super(props);
}

class InitialRegister extends RegisterState {
  @override
  String toString() => 'InitialRegister';
}

class Registed extends RegisterState {
  @override
  String toString() => 'Registed';
}

class UnRegisted extends RegisterState {
  @override
  String toString() => 'UnRegisted';
}

class Registing extends RegisterState {
  @override
  String toString() => 'Registing';
}
