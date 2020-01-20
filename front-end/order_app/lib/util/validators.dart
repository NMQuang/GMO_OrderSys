import 'package:order_app/util/messages.dart';

class Validators {
  static final RegExp _codeRegExp = RegExp(
    r'^[0-9]+$',
  );
  static final RegExp _passwordRegExp = RegExp(
    r'^[A-Za-z0-9]+$',
  );

  static final RegExp _nameRegExp = new RegExp(r'^[A-Za-z0-9 ]+$');

  /// Validate password field
  static String validatePassword(String password) {
    if (password.isEmpty)
      return Messages.pass_ms1;
    else if (!_passwordRegExp.hasMatch(password))
      return Messages.pass_ms2;
    else if (password.length < 6 || password.length > 16)
      return Messages.pass_ms3;
    else
      return null;
  }

  /// Validate code field
  static String validateCode(String code) {
    if (code.isEmpty)
      return Messages.code_ms1;
    else if (!_codeRegExp.hasMatch(code))
      return Messages.code_ms2;
    else if (code.length != 4)
      return Messages.code_ms3;
    else
      return null;
  }

  /// Validate Name Field
  static String validateName(String name) {
    if (name.isEmpty)
      return Messages.name_ms1;
    else if (!_nameRegExp.hasMatch(name))
      return Messages.name_ms2;
    else if (name.length > 255)
      return Messages.name_ms3;
    else
      return null;
  }
}
