import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MessagesDialog extends StatelessWidget {
  final List<String> messages;

  const MessagesDialog({Key key, this.messages}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoAlertDialog(
        title: Text("Messages"),
        content: Column(
            children: messages
                .map((message) => Container(
                    child: Text(message), margin: EdgeInsets.only(top: 10)))
                .toList()),
        actions: [
          FlatButton(
              child: Text("Close"),
              onPressed: () => Navigator.of(context).pop())
        ]);
  }
}
