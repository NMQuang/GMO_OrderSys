import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:intl/intl.dart';

import '../../models/index.dart';
import '../../redux/states/user_state.dart';
import '../../util/index.dart';
import '../../widgets/index.dart';
import 'bloc/bloc.dart';

class SummaryScreen extends StatefulWidget {
  final SummaryBloc _summaryBloc = SummaryBloc();

  SummaryScreen({Key key}) : super(key: key);

  _SummaryScreenState createState() => _SummaryScreenState();
}

class _SummaryScreenState extends State<SummaryScreen> {
  final _formater = new DateFormat('dd-MM');

  Menu menu;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((duration) {
      setState(() {
        menu = ModalRoute.of(context).settings.arguments;
      });

      widget._summaryBloc.dispatch(
        InitData(
            user: StoreProvider.of<UserState>(context).state.user,
            menu: ModalRoute.of(context).settings.arguments),
      );

      widget._summaryBloc.dispatch(GetSummary());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text(Constants.summary_screen_name)),
        body: Container(
          child: StreamBuilder(
            stream: widget._summaryBloc.summariesStream,
            builder: (context, AsyncSnapshot<List<ProductSummary>> snapshot) {
              if (snapshot.data == null)
                return Container(
                  child: Text(
                    "Not found summary",
                  ),
                );

              List<Widget> children = [
                Container(
                  margin: EdgeInsets.only(top: 10),
                  alignment: Alignment.center,
                  height: 50,
                  color: Colors.amber,
                  child: Text(
                    "MENU ${menu != null ? _formater.format(menu.createdAt) : "---"}",
                  ),
                ),
              ];
              snapshot.data.forEach((item) {
                children.add(SummaryItem(
                  productSummary: item,
                ));
              });

              var sum = snapshot.data
                  .map((summary) => summary.users.length)
                  .reduce((a, b) => a + b);

              children.add(
                Container(
                  margin: EdgeInsets.only(top: 10),
                  padding: EdgeInsets.only(right: 40),
                  alignment: Alignment.centerRight,
                  height: 50,
                  color: Colors.amber,
                  child: Text("TOTAL:  $sum"),
                ),
              );

              return ListView(
                padding: EdgeInsets.all(8),
                children: children,
              );
            },
          ),
        ));
  }
}
