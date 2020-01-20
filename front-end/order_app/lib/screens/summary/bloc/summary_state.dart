import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class SummaryState extends Equatable {
  SummaryState([List props = const []]) : super(props);
}

class InitialSummaryState extends SummaryState {}
