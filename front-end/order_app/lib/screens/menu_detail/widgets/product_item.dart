import 'package:flutter/material.dart';

import '../../../models/index.dart';

class ProductItem extends StatelessWidget {
  final Product product;

  final bool selected;

  final onPressed;

  const ProductItem({
    Key key,
    this.product,
    this.selected,
    this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => ListTile(
      contentPadding: EdgeInsets.all(0),
      leading: Stack(children: [
        Image.network(
          product.image,
          width: 70,
          height: 90,
        ),

        // FlutterLogo(size: 70)
      ]),
      subtitle: Text("${product.note}"),
      title: Text("${product.name}",
          style: TextStyle(fontWeight: FontWeight.bold)),
      trailing: IconButton(
          color: selected ? Colors.green : Colors.red,
          icon: selected
              ? Icon(Icons.check_circle)
              : Icon(Icons.check_circle_outline),
          iconSize: 45,
          onPressed: () => onPressed()));
}
