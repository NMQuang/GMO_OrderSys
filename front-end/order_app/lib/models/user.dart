import '../util/index.dart';

class User {
  int _id;
  String _code, _name, _role, _password, _accessToken;

  User();

  int get id => _id;
  String get code => _code;
  String get name => _name;
  String get role => _role;
  String get password => _password;
  String get accessToken => _accessToken;

  bool get admin => role == Constants.role_admin;

  set id(int id) {
    this._id = id;
  }

  set code(String code) {
    this._code = code;
  }

  set name(String name) {
    this._name = name;
  }

  set role(String role) {
    this._role = role;
  }

  set password(String password) {
    this._password = password;
  }

  set accessToken(String accessToken) {
    this._accessToken = accessToken;
  }

  User.fromJson(Map<String, dynamic> json)
      : _id = json['id'],
        _code = json['code'],
        _name = json['name'],
        _role = json['role'],
        _accessToken = json['accessToken'];

  @override
  String toString() =>
      'User { id: $_id, name: $_name, code: $_code, accessToken: $_accessToken, role: $_role, password: $_password }';
}
