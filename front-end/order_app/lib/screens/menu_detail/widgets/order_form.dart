import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../models/index.dart';
import '../../../widgets/index.dart';
import '../bloc/bloc.dart';
import 'product_item.dart';

class OrderForm extends StatefulWidget {
  final MenuDetailBloc menuDetailBloc;

  OrderForm({Key key, this.menuDetailBloc}) : super(key: key);

  _OrderFormState createState() => _OrderFormState();
}

class _OrderFormState extends State<OrderForm> {
  @override
  Widget build(BuildContext context) {
    return ListView(padding: EdgeInsets.all(8), children: [
      //
      Container(
        margin: EdgeInsets.only(top: 10),
        padding: EdgeInsets.only(left: 20),
        alignment: Alignment.centerLeft,
        height: 50,
        color: Colors.amber,
        child: Text("Ordered"),
      ),

      //
      StreamBuilder(
        stream: widget.menuDetailBloc.order,
        builder: (context, AsyncSnapshot<Order> snapshot) {
          if (snapshot.data == null) return Container();
          return Container(
              margin: EdgeInsets.only(top: 10),
              alignment: Alignment.center,
              child: ProductItem(
                  product: snapshot.data.product,
                  selected: true,
                  onPressed: () => null));
        },
      ),

      //
      Container(
        margin: EdgeInsets.only(top: 10),
        padding: EdgeInsets.only(left: 20),
        alignment: Alignment.centerLeft,
        height: 50,
        color: Colors.amber,
        child: Text("Products"),
      ),

      StreamBuilder(
          stream: widget.menuDetailBloc.items,
          builder: (context, AsyncSnapshot<List<ItemList>> snapshot) {
            // Case data null
            if (snapshot.data == null) return Container();

            List<Widget> list = [];

            // Else
            snapshot.data.forEach((item) {
              list.add(Container(
                  margin: EdgeInsets.only(top: 10),
                  alignment: Alignment.center,
                  child: ProductItem(
                      product: item.product,
                      selected: item.selected,
                      onPressed: () =>
                          _onPressed(item.product.id, item.selected))));
            });

            list.insert(
                snapshot.data.length,
                Container(
                    margin: EdgeInsets.only(top: 30),
                    child: FlatButton(
                        onPressed: snapshot.data.isEmpty ? null : _showDialog,
                        color: Colors.blueAccent,
                        disabledColor: Colors.cyan,
                        child: Container(
                            alignment: Alignment.center,
                            height: 50,
                            child: Text("ORDER")))));

            return Column(children: list);
          }),
    ]);
  }

  void _showDialog() => showDialog(
      context: context,
      builder: (context) => ConfirmDialog(
          onConfirm: () => widget.menuDetailBloc.dispatch(SubmitOrder())));

  void _onPressed(int id, bool selected) => selected
      ? null
      : widget.menuDetailBloc.dispatch(SelectProduct(productId: id));
}
