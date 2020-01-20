import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import '../../../util/index.dart';
import '../../../widgets/index.dart';
import '../bloc/bloc.dart';

class FormRegister extends StatefulWidget {
  final RegisterBloc _registerBloc;

  FormRegister({
    Key key,
    @required RegisterBloc registerBloc,
  })  : _registerBloc = registerBloc,
        super(key: key);

  @override
  _FormRegisterState createState() => _FormRegisterState();
}

class _FormRegisterState extends State<FormRegister> {
  final TextStyle style = TextStyle(fontFamily: 'Montserrat', fontSize: 20.0);

  TextEditingController name = TextEditingController(),
      password = TextEditingController(),
      code = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  bool _dirtyCode = false,
      _dirtyName = false,
      _dirtyPass = false,
      _enableRegister = false;

  FocusNode _focusCode = FocusNode(),
      _focusName = FocusNode(),
      _focusPass = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Form(
      onChanged: () {
        _formKey.currentState.validate();
        validateRegisterButton();
      },
      key: _formKey,
      child: Container(
        padding: EdgeInsets.only(left: 10, right: 10),
        alignment: Alignment.bottomCenter,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // Text input code
            codeField(),
            Container(margin: EdgeInsets.only(top: 20)),

            // Text input username
            nameField(),
            Container(margin: EdgeInsets.only(top: 20)),

            // Text input password
            passwordField(),
            Container(margin: EdgeInsets.only(top: 40)),

            // Register button
            registerButton(),
            Container(margin: EdgeInsets.only(top: 20)),

            // Register button
            cancelButton(),
            Container(margin: EdgeInsets.only(top: 20)),
          ],
        ),
      ),
    );
  }

  /// Render button submit
  registerButton() => BounceInAnimation(
        delay: const Duration(milliseconds: 500),
        child: RaisedHarpyButton(
            backgroundColor: _enableRegister ? null : Colors.grey,
            text: "Register",
            onTap: () => _enableRegister ? register() : null),
      );

  /// Render cancel button
  cancelButton() => BounceInAnimation(
      delay: const Duration(milliseconds: 700),
      child: NewFlatHarpyButton(
          text: "Login with GMO account",
          onTap: () => Navigator.of(context).pop()));

  /// Render password field
  passwordField() => Container(
        child: TextFormField(
          key: Key("password_field"),
          controller: password,
          obscureText: true,
          focusNode: _focusPass,
          style: style,
          validator: (pass) =>
              _dirtyPass ? Validators.validatePassword(pass) : null,
          decoration: InputDecoration(
            contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
            hintText: "Password",
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(32.0),
            ),
          ),
        ),
      );

  /// Render name field
  nameField() => Container(
      key: Key("name_field"),
      child: TextFormField(
          keyboardType: TextInputType.text,
          controller: name,
          focusNode: _focusName,
          style: style,
          validator: (name) =>
              _dirtyName ? Validators.validateName(name) : null,
          decoration: InputDecoration(
              contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
              hintText: "Name",
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(32.0)))));

  /// Render username field
  codeField() => Container(
        key: Key("code_field"),
        child: TextFormField(
          keyboardType: TextInputType.number,
          controller: code,
          focusNode: _focusCode,
          style: style,
          validator: (code) =>
              _dirtyCode ? Validators.validateCode(code) : null,
          decoration: InputDecoration(
            contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
            hintText: "Code",
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(32.0),
            ),
          ),
        ),
      );

  /// Validate enable register button
  validateRegisterButton() {
    if (_formKey.currentState.validate() &&
        _dirtyCode == true &&
        _dirtyName == true &&
        _dirtyPass == true &&
        _enableRegister == false) {
      setState(() {
        _enableRegister = true;
      });
    }
    if (!_formKey.currentState.validate() && _enableRegister) {
      setState(() {
        _enableRegister = false;
      });
    }
  }

  /// Register
  register() {
    widget._registerBloc.dispatch(
      Submitted(
        code: code.text,
        name: name.text,
        password: password.text,
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _focusCode.addListener(_onFocusCodeField);
    _focusName.addListener(_onFocusNameField);
    _focusPass.addListener(_onFocusPassField);
  }

  void _onFocusCodeField() {
    if (!_dirtyCode) {
      _dirtyCode = true;
      _formKey.currentState.validate();
    }
  }

  void _onFocusNameField() {
    if (!_dirtyName) {
      _dirtyName = true;
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
