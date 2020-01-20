import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:intl/intl.dart';

import '../../models/index.dart';
import '../../redux/states/index.dart';
import '../../util/index.dart';
import '../../widgets/index.dart';
import 'bloc/bloc.dart';

class MainScreen extends StatefulWidget {
  final MainBloc _mainBloc = new MainBloc();

  MainScreen({Key key}) : super(key: key);

  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  // ScrollController _scrollController = ScrollController();

  final _formater = new DateFormat('dd-MM');

  Widget _menues;

  @override
  void initState() {
    super.initState();

    // Binding after layout callback
    WidgetsBinding.instance.addPostFrameCallback((duration) {
      widget._mainBloc.dispatch(
        InitData(user: StoreProvider.of<UserState>(context).state.user),
      );

      widget._mainBloc.dispatch(GetAllMenu());
    });

    // _scrollController.addListener(() {
    //   // bool endRichies = _scrollController.offset >=
    //   //         _scrollController.position.maxScrollExtent &&
    //   //     !_scrollController.position.outOfRange;
    //   // if (endRichies) {
    //   //   _showToast("Loading");
    //   // }
    // });
  }

  @override
  Widget build(BuildContext context) {
    _buildMenues();

    return WillPopScope(
        onWillPop: () async => false,
        child: Scaffold(
            appBar: AppBar(
              title: Text(Constants.main_screen_name),
              leading: Container(),
            ),
            body: BlocBuilder(
                bloc: widget._mainBloc,
                builder: (context, MainState state) => _menues)));
  }

  _buildMenues() {
    if (_menues != null) return null;

    _menues = StreamBuilder(
        stream: widget._mainBloc.menues,
        builder: (context, AsyncSnapshot<List<Menu>> snapshot) {
          if (snapshot.data == null) return Container();
          return Container(
              child: RefreshIndicator(
                  onRefresh: () async {},
                  child: ListView.separated(
                      key: Key("list_menu"),
                      // controller: _scrollController,
                      padding: EdgeInsets.all(8.0),
                      itemCount: snapshot.data.length,
                      separatorBuilder: (context, index) => Divider(),
                      itemBuilder: (context, index) => MenuItem(
                          key: Key(snapshot.data[index].id.toString()),
                          menu: snapshot.data[index],
                          title: "Menu " +
                              _formater
                                  .format(snapshot.data[index].validTo)))));
        });
  }

  @override
  void dispose() {
    super.dispose();
    widget._mainBloc.dispose();
  }
}
