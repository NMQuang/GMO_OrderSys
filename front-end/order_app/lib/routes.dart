import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

import 'redux/reducers/index.dart' show userReducer;
import 'redux/states/index.dart' show AuthenticationUninitialized, UserState;
import 'screens/index.dart'
    show
        AuthenticationScreen,
        MainScreen,
        MenuDetailScreen,
        RegisterScreen,
        SummaryScreen;
import 'util/index.dart' show RoutesURL;

class Routes extends StatelessWidget {
  const Routes({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Setup global user store [redux]
    final userStore = new Store<UserState>(
      userReducer,
      initialState: AuthenticationUninitialized(null),
    );

    // App UI, return Widget
    return StoreProvider<UserState>(
        store: userStore,
        child: MaterialApp(
            debugShowCheckedModeBanner: false,
            title: "GMO order",
            theme: ThemeData(primarySwatch: Colors.blueAccent[50]),
            initialRoute: RoutesURL.authentication_url,

            // Routes
            routes: {
              RoutesURL.authentication_url: (context) => AuthenticationScreen(),
              RoutesURL.register_url: (context) => RegisterScreen(),
              RoutesURL.main_url: (context) => MainScreen(),
              RoutesURL.menu_detail_url: (context) => MenuDetailScreen(),
              RoutesURL.summary_url: (context) => SummaryScreen()
            }));
  }
}
