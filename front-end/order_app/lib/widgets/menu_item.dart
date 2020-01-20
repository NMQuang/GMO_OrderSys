import 'package:flutter/material.dart';

import '../models/index.dart';
import '../util/index.dart';

class MenuItem extends StatelessWidget {
  final Menu menu;
  final String title;

  const MenuItem({Key key, this.menu, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var icon = Icon(Icons.fastfood, size: 13, color: Colors.blueGrey[300]);

    return Padding(
      padding: EdgeInsets.only(bottom: 15.0),
      child: InkWell(
        child: Container(
            height: 70,
            child: Row(children: <Widget>[
              ClipRRect(
                  borderRadius: BorderRadius.circular(5),
                  child: FlutterLogo(size: 60)),
              SizedBox(width: 15),
              Container(
                  height: 80,
                  width: MediaQuery.of(context).size.width - 130,
                  child: ListView(
                      primary: false,
                      physics: NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      children: [
                        Container(
                            alignment: Alignment.centerLeft,
                            child: Text(title,
                                style: TextStyle(
                                    fontWeight: FontWeight.w700,
                                    // fontSize: 14),
                                    fontSize: 17),
                                maxLines: 2,
                                textAlign: TextAlign.left)),
                        // SizedBox(height: 3),
                        SizedBox(height: 8),
                        Row(
                          children: [
                            icon,
                            SizedBox(width: 3),
                            Container(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                    "Product quantity: ${menu.productQuantity}",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                      color: Colors.blueGrey[300],
                                    ),
                                    maxLines: 1,
                                    textAlign: TextAlign.left))
                          ],
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            icon,
                            SizedBox(width: 3),
                            Container(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                    "Order time: ${menu.validFrom.hour + 1}h - ${menu.validTo.hour + 1}h",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                      color: Colors.blueGrey[300],
                                    ),
                                    maxLines: 1,
                                    textAlign: TextAlign.left))
                          ],
                        ),
                        SizedBox(height: 10),
                        Container(
                            alignment: Alignment.centerLeft,
                            child: Text("Id: ${menu.id}"))
                      ]))
            ])),
        onTap: () => Navigator.of(context).pushNamed(
          RoutesURL.menu_detail_url,
          arguments: menu,
        ),
      ),
    );
  }
}
