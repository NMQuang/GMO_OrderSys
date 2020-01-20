import 'package:flutter/foundation.dart';

abstract class FoodException implements Exception {
  final List<String> messages;

  FoodException({@required this.messages});
}

/// [User exceptions]
///
/// throws when authentication fails
class AuthenticationException implements FoodException {
  final List<String> messages;

  AuthenticationException({this.messages});

  @override
  String toString() => "AuthenticationException";
}

/// throws when register fails
class RegisterException implements FoodException {
  final List<String> messages;

  RegisterException({this.messages});

  @override
  String toString() => "RegisterException";
}

/// throws when handle menu
class MenuException implements FoodException {
  final List<String> messages;

  MenuException({this.messages});

  @override
  String toString() => "MenuException";
}

/// throws when register fails
class OrderException implements FoodException {
  final List<String> messages;

  OrderException({this.messages});

  @override
  String toString() => "OrderException";
}
