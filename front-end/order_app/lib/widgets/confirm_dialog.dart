import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ConfirmDialog extends StatelessWidget {
  final onConfirm;

  ConfirmDialog({Key key, this.onConfirm}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoAlertDialog(
        title: Text("Confirm"),
        content: Column(children: [
          // Text("Your order is xyz"),
          Container(margin: EdgeInsets.only(top: 20)),
          // FlutterLogo(size: 60)
        ]),
        actions: [
          FlatButton(
              child: Text("Close"),
              onPressed: () => Navigator.of(context).pop()),
          FlatButton(
            child: Text("Confirm"),
            onPressed: () {
              onConfirm();
              Navigator.of(context).pop();
            },
          )
        ]);
  }
}
