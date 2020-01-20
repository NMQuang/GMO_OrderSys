import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class MainState extends Equatable {
  MainState([List props = const []]) : super(props);
}

class InitialMainState extends MainState {
  @override
  String toString() => "InitialMainState";
}

class OnLoadMainState extends MainState {
  @override
  String toString() => "OnLoadMainState";
}
