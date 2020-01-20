import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import '../../../util/index.dart' show RoutesURL, Validators;
import '../../../widgets/index.dart'
    show BounceInAnimation, NewFlatHarpyButton, RaisedHarpyButton;
import '../bloc/bloc.dart';

class FormAuth extends StatefulWidget {
  final AuthenticationBloc _authenticationBloc;

  FormAuth({
    Key key,
    @required AuthenticationBloc authenticationBloc,
  })  : _authenticationBloc = authenticationBloc,
        super(key: key);

  @override
  _FormAuthState createState() => _FormAuthState();
}

class _FormAuthState extends State<FormAuth> {
  final TextStyle style = TextStyle(fontFamily: 'Montserrat', fontSize: 20.0);

  final TextEditingController code = TextEditingController();

  final TextEditingController password = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  bool _enableLogin = true, _dirtyCode = false, _dirtyPass = false;

  final FocusNode _focusCode = FocusNode(), _focusPass = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Form(
        key: _formKey,
        onChanged: () {
          _formKey.currentState.validate();
          validateLoginButton();
        },
        child: Container(
          padding: EdgeInsets.only(left: 10, right: 10),
          alignment: Alignment.bottomCenter,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // Text input code
              codeField(),

              // Magrin
              Container(margin: EdgeInsets.only(top: 20)),

              // Text input password
              passwordField(),

              // Magrin
              Container(margin: EdgeInsets.only(top: 40)),

              // Submit button
              loginButton(),

              // Magrin
              Container(margin: EdgeInsets.only(top: 40)),

              // Register button
              registerButton(),

              // Magrin
              Container(margin: EdgeInsets.only(top: 40)),
            ],
          ),
        ));
  }

  /// Render login submit
  loginButton() => BounceInAnimation(
      delay: const Duration(milliseconds: 500),
      child: RaisedHarpyButton(
        backgroundColor: _enableLogin ? null : Colors.grey,
        text: "       Login        ",
        onTap: () => _enableLogin ? login() : null,
      ));

  /// Render login submit
  registerButton() => BounceInAnimation(
        delay: const Duration(milliseconds: 700),
        child: NewFlatHarpyButton(
          text: "Create an account",
          onTap: () => Navigator.of(context).pushNamedAndRemoveUntil(
            RoutesURL.register_url,
            (route) => true,
          ),
        ),
      );

  /// Render password field
  passwordField() => Container(
      child: TextFormField(
          key: Key("password_field"),
          controller: password,
          obscureText: true,
          focusNode: _focusPass,
          validator: (pass) =>
              _dirtyPass ? Validators.validatePassword(pass) : null,
          style: style,
          decoration: InputDecoration(
              contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
              hintText: "Password",
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(32.0)))));

  /// Render Code field
  codeField() => Container(
      key: Key("code_field"),
      child: TextFormField(
          keyboardType: TextInputType.number,
          controller: code,
          focusNode: _focusCode,
          validator: (code) =>
              _dirtyCode ? Validators.validateCode(code) : null,
          style: style,
          decoration: InputDecoration(
              contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
              hintText: "Code",
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(32.0)))));

  /// Validate enable Login button
  validateLoginButton() {
    if (_formKey.currentState.validate() == true &&
        _dirtyCode &&
        _dirtyPass &&
        _enableLogin == false) {
      setState(() {
        _enableLogin = true;
      });
    }
    if (_formKey.currentState.validate() == false && _enableLogin == true) {
      setState(() {
        _enableLogin = false;
      });
    }
  }

  /// Login
  login() {
    widget._authenticationBloc
        .dispatch(LoggedIn(code: "2395", password: "minhquang96"));
    // .dispatch(LoggedIn(code: code.text, password: password.text));
    // .dispatch(LoggedIn(code: "1234", password: "123456")),
    // .dispatch(LoggedIn(code: code.text, password: password.text));
    // .dispatch(LoggedIn(code: "2395", password: "minhquang96"));
  }

  @override
  void initState() {
    super.initState();
    _focusCode.addListener(_onFocusCodeField);
    _focusPass.addListener(_onFocusPassField);
  }

  void _onFocusCodeField() {
    if (!_dirtyCode) {
      _dirtyCode = true;
      _formKey.currentState.validate();
    }
  }

  void _onFocusPassField() {
    if (!_dirtyPass) {
      _dirtyPass = true;
      _formKey.currentState.validate();
    }
  }
}
