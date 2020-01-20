import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ProgressLoading extends StatelessWidget {
  final Color backgroundColor;
  final Color color;
  final Color containerColor;
  final double borderRadius;
  final String text;
  final bool loading;
  // final _ProgressLoadingState _state = _ProgressLoadingState();

  // _ProgressLoadingState get state => _state;

  ProgressLoading({
    Key key,
    this.backgroundColor = Colors.black54,
    this.color = Colors.white,
    this.containerColor = Colors.transparent,
    this.borderRadius = 10.0,
    this.text,
    this.loading = true,
  }) : super(key: key);

  // @override
  // State<StatefulWidget> createState() => _state;

  @override
  Widget build(BuildContext context) {
    // Return empty widget
    if (!loading)
      return Container();
    else
      return Scaffold(
        backgroundColor: backgroundColor,
        body: Stack(
          children: <Widget>[
            Center(
              child: Container(
                width: 100.0,
                height: 100.0,
                decoration: BoxDecoration(
                  color: containerColor,
                  borderRadius: BorderRadius.all(Radius.circular(borderRadius)),
                ),
              ),
            ),
            // Center(
            //   child: CircularProgressIndicator(
            //     valueColor: AlwaysStoppedAnimation(color),
            //   ),
            // ),
            Center(
                child: Opacity(
                    opacity: 0.5,
                    child: Container(
                        decoration: BoxDecoration(
                            color: Colors.black,
                            border: Border.all(width: 1.0),
                            borderRadius:
                                BorderRadius.all(Radius.circular(6.0))),
                        width: 70,
                        height: 70,
                        child: CupertinoActivityIndicator(animating: true))))
          ],
        ),
      );
  }
}

// class _ProgressLoadingState extends State<ProgressLoading> {
//   bool _visible = true;

//   bool get visible => _visible;

//   @override
//   void initState() {
//     super.initState();

//     _visible = widget.loading;
//   }

//   void dismiss() {
//     setState(() {
//       this._visible = false;
//     });
//   }

//   void show() {
//     setState(() {
//       this._visible = true;
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     if (_visible) {
//       return new Scaffold(
//           backgroundColor: widget.backgroundColor,
//           body: new Stack(
//             children: <Widget>[
//               new Center(
//                 child: new Container(
//                   width: 100.0,
//                   height: 100.0,
//                   decoration: new BoxDecoration(
//                       color: widget.containerColor,
//                       borderRadius: new BorderRadius.all(
//                           new Radius.circular(widget.borderRadius))),
//                 ),
//               ),
//             ],
//           ));
//     } else {
//       return new Container();
//     }
//   }

//   // Widget _getCenterContent() {
//   //   if (widget.text == null || widget.text.isEmpty) {
//   //     return _getCircularProgress();
//   //   }

//   //   return new Center(
//   //     child: new Column(
//   //       mainAxisAlignment: MainAxisAlignment.center,
//   //       children: [
//   //         _getCircularProgress(),
//   //         new Container(
//   //           margin: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
//   //           child: new Text(
//   //             widget.text,
//   //             style: new TextStyle(color: widget.color),
//   //           ),
//   //         )
//   //       ],
//   //     ),
//   //   );
//   // }

//   // Widget _getCircularProgress() {
//   //   return new CircularProgressLoading(
//   //       valueColor: new AlwaysStoppedAnimation(widget.color));
//   // }
// }
