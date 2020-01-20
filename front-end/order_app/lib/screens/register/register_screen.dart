import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:order_app/screens/register/bloc/bloc.dart';
import 'package:order_app/util/index.dart';

import '../../widgets/index.dart';
import 'bloc/register_bloc.dart';
import 'widgets/form_register.dart';

class RegisterScreen extends StatefulWidget {
  final RegisterBloc _registerBloc = new RegisterBloc();

  RegisterScreen({Key key}) : super(key: key);

  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  FormRegister _formRegister;

  // Save screen
  Widget _registerScreen;
  @override
  void initState() {
    super.initState();
    _formRegister = FormRegister(registerBloc: widget._registerBloc);

    widget._registerBloc.state.listen((registerBloc) {
      if (registerBloc is Registed) {
        _showDialog(["Register successful!"]);
      }

      if (registerBloc is UnRegisted) {
        _showDialog([Messages.register_fail]);
      }
    });
  }

  Widget _createForm(BuildContext context) {
    return Scaffold(
        body: Stack(children: <Widget>[
      // Input fields
      BlocProvider(
          builder: (BuildContext context) => widget._registerBloc,
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Container(margin: EdgeInsets.only(top: 30)),

                SlideAnimation(
                  duration: const Duration(seconds: 3),
                  endPosition: const Offset(0, 20),
                  // delay: const Duration(milliseconds: 800),
                  child: FlutterLogo(size: 200),
                ),
                Container(margin: EdgeInsets.only(top: 30)),

                // Form register
                _formRegister
              ],
            ),
          )),

      BlocBuilder(
          bloc: widget._registerBloc,
          builder: (context, state) => ProgressLoading(
              backgroundColor: Colors.transparent,
              containerColor: Colors.transparent,
              color: Colors.black,
              loading: state is Registing))
    ]));
  }

  @override
  Widget build(BuildContext context) {
    if (_registerScreen == null) _registerScreen = _createForm(context);
    return _registerScreen;
  }

  void _showDialog(List<String> messages) => showDialog(
      context: context,
      builder: (context) => MessagesDialog(messages: messages));
}
