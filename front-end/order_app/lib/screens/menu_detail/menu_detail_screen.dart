import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:intl/intl.dart';

import '../../models/index.dart';
import '../../redux/states/index.dart';
import '../../util/index.dart';
import '../../widgets/index.dart';
import 'bloc/bloc.dart';
import 'widgets/order_form.dart';

class MenuDetailScreen extends StatefulWidget {
  final MenuDetailBloc _menuDetailBloc = MenuDetailBloc();

  MenuDetailScreen({Key key}) : super(key: key);

  _MenuDetailScreenState createState() => _MenuDetailScreenState();
}

class _MenuDetailScreenState extends State<MenuDetailScreen> {
  final _formater = new DateFormat('dd-MM');

  Menu menu;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((duration) {
      setState(() {
        menu = ModalRoute.of(context).settings.arguments;
      });

      widget._menuDetailBloc.dispatch(
        InitData(
            user: StoreProvider.of<UserState>(context).state.user,
            menu: ModalRoute.of(context).settings.arguments),
      );

      widget._menuDetailBloc.dispatch(GetMenuDetail());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Scaffold(
        appBar: AppBar(
          title: Text(
            "MENU ${menu != null ? _formater.format(menu.createdAt) : ""}",
          ),
        ),
        body: Container(
          child: OrderForm(menuDetailBloc: widget._menuDetailBloc),
        ),
        floatingActionButton: BounceInAnimation(
          delay: const Duration(milliseconds: 300),
          child: RaisedHarpyButton(
            text: "Summary",
            onTap: () => Navigator.of(context).pushNamed(
              RoutesURL.summary_url,
              arguments: menu,
            ),
          ),
        ),
      ),

      // Loading indicator
      BlocBuilder(
          bloc: widget._menuDetailBloc,
          builder: (context, state) => ProgressLoading(
              backgroundColor: Colors.transparent,
              containerColor: Colors.transparent,
              color: Colors.black,
              loading: state is LoadingMenuDetail))
    ]);
  }

  @override
  void dispose() {
    super.dispose();
    widget._menuDetailBloc.dispose();
  }
}
