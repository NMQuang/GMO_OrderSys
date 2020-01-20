import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_redux/flutter_redux.dart';

import '../../redux/actions/index.dart';
import '../../redux/states/index.dart';
import '../../util/index.dart';
import '../../widgets/index.dart';
import 'bloc/bloc.dart';
import 'widgets/form_auth.dart';

class AuthenticationScreen extends StatefulWidget {
  final AuthenticationBloc _authenticationBloc = new AuthenticationBloc();

  AuthenticationScreen({Key key}) : super(key: key);

  _AuthenticationScreenState createState() => _AuthenticationScreenState();
}

class _AuthenticationScreenState extends State<AuthenticationScreen> {
  FormAuth _formAuth;
  // Save form.
  Widget _authenticationScreen;

  @override
  void initState() {
    super.initState();

    _formAuth = FormAuth(authenticationBloc: widget._authenticationBloc);

    // Binding after layout callback
    WidgetsBinding.instance.addPostFrameCallback((duration) {
      // Event [UserState] changed
      StoreProvider.of<UserState>(context).onChange.listen((state) {
        // Navigate to main screen and remove authentication screen
        if (state is AuthenticationAuthenticated)
          Navigator.of(context)
              .pushNamedAndRemoveUntil(RoutesURL.main_url, (route) => true);
      });

      // Authentication state on change
      widget._authenticationBloc.state.listen((athenticationState) {
        // If state is authenticated dispatch update user
        if (athenticationState is Authenticated) {
          StoreProvider.of<UserState>(context)
              .dispatch(AddUserAction(athenticationState.user));
        }

        // Login fail, then show dialog message
        if (athenticationState is Unauthenticated)
          _showDialog([Messages.authentication_fail]);
      });
    });
  }

  Widget _createForm(BuildContext context) {
    return Scaffold(
      body: Stack(children: [
        BlocProvider(
            builder: (BuildContext context) => widget._authenticationBloc,
            child: Container(
              constraints: BoxConstraints.expand(),
              alignment: Alignment.center,
              child: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    FlutterLogo(size: 200),
                    Container(margin: EdgeInsets.only(top: 30)),

                    // Form authentication
                    _formAuth,
                  ],
                ),
              ),
            )),
        // Loading indicator
        BlocBuilder(
            bloc: widget._authenticationBloc,
            builder: (context, AuthenticationState state) => ProgressLoading(
                backgroundColor: Colors.transparent,
                containerColor: Colors.transparent,
                color: Colors.black,
                loading: state is Authenticating)),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_authenticationScreen == null)
      _authenticationScreen = _createForm(context);
    return _authenticationScreen;
  }

  void _showDialog(List<String> messages) => showDialog(
      context: context,
      builder: (context) => MessagesDialog(messages: messages));

  @override
  void dispose() {
    super.dispose();
    widget._authenticationBloc.dispose();
  }
}
