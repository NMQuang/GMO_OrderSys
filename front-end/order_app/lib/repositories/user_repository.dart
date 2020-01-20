import 'package:flutter/foundation.dart';
import 'package:rxdart/rxdart.dart';

import '../models/index.dart';
import '../providers/index.dart';

class UserRepository {
  final UserProvider _userProvider;

  UserRepository(this._userProvider);

  Subject<User> authentication({
    @required String code,
    @required String password,
  }) =>
      _userProvider.login(code: code, password: password);

  Subject<User> register({
    @required String code,
    @required String name,
    @required String password,
  }) =>
      _userProvider.register(code: code, name: name, password: password);
}
