import 'package:flutter/material.dart';

import '../models/index.dart';

class SummaryItem extends StatelessWidget {
  final ProductSummary productSummary;

  const SummaryItem({Key key, @required this.productSummary}) : super(key: key);

  @override
  Widget build(BuildContext context) => Padding(
      padding: EdgeInsets.symmetric(horizontal: 8.0),
      child: ListTile(
          onTap: () {},
          contentPadding: EdgeInsets.all(0),
          leading: leading(),

          // Title
          title: Text("${productSummary.product.name}",
              style: TextStyle(fontWeight: FontWeight.bold)),

          // Trailing
          trailing: trailing()));

  leading() => Stack(
        children: [
          Image.network(
            productSummary.product.image,
            width: 50,
            height: 50,
          ),
          // FlutterLogo(size: 40),
          Positioned(
              bottom: 0.0,
              left: 6.0,
              child: Container(
                  height: 12,
                  width: 12,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(6)),
                  child: Center(
                      child: Container(
                          height: 8,
                          width: 8,
                          decoration: BoxDecoration(
                              color: Colors.greenAccent,
                              borderRadius: BorderRadius.circular(6))))))
        ],
      );

  trailing() => Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisSize: MainAxisSize.max,
          children: [
            Container(
                padding: EdgeInsets.all(2),
                constraints: BoxConstraints(minWidth: 10, minHeight: 20),
                decoration: BoxDecoration(
                    color: Colors.red, borderRadius: BorderRadius.circular(8)),
                child: Padding(
                    padding: EdgeInsets.only(top: 2, left: 5, right: 5),
                    child: Text("${productSummary.users.length}",
                        style: TextStyle(color: Colors.white, fontSize: 12),
                        textAlign: TextAlign.center)))
          ]);
}
