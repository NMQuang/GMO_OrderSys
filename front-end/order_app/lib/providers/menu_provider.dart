import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:rxdart/rxdart.dart';

import '../models/index.dart';
import '../util/index.dart';

class MenuProvider {
  /// Return [subject] handled [response], [exception]
  ///
  /// Params `String` [token]
  Subject<List<Menu>> getAllMenu({@required String token}) {
    CancelToken cancelToken = new CancelToken();

    BehaviorSubject<List<Menu>> subject = BehaviorSubject();

    subject.onCancel = () {
      if (cancelToken.isCancelled) cancelToken.cancel();
    };

    Options options = Options(
      headers: {"Content-Type": "application/json", "x-access-token": token},
      receiveTimeout: Constants.time_out,
      receiveDataWhenStatusError: true,
      validateStatus: (status) => true,
    );

    Dio()
        .get(
          ApiURL.get_all_menu,
          options: options,
          cancelToken: cancelToken,
        )
        .then((response) {
          if (ResponseUtil.valid(response)) {

            // Parse response json to list menu
            List<Menu> menues = List<Menu>.from(
              response.data["data"]
                  .toList()
                  .map((json) => Menu.fromJson(json))
                  .toList(),
            );

            subject.add(menues);
          } else
            subject.addError(MenuException);
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }

  /// Return [subject] handled [response], [exception]
  ///
  /// Params `String` [token], `int` [menuId]
  Subject<List<Product>> getMenuDetail({
    @required String token,
    @required int menuId,
  }) {
    CancelToken cancelToken = new CancelToken();

    BehaviorSubject<List<Product>> subject = BehaviorSubject();

    subject.onCancel = () {
      if (cancelToken.isCancelled) cancelToken.cancel();
    };

    Options options = Options(
      headers: {"Content-Type": "application/json", "x-access-token": token},
      receiveTimeout: Constants.time_out,
      receiveDataWhenStatusError: true,
      validateStatus: (status) => true,
    );

    Dio()
        .get(
          ApiURL.get_menu_detail + "/$menuId",
          options: options,
          cancelToken: cancelToken,
        )
        .then((response) {
          if (ResponseUtil.valid(response)) {
            //
            List<Product> products = List<Product>.from(
              response.data["data"]
                  .toList()
                  .map((json) => Product.fromJson(json))
                  .toList(),
            );

            subject.add(products);
          } else
            subject.addError(MenuException);
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }

  /// Return [subject] handled [response], [exception]
  ///
  /// Params `String` [token], `int` [menuId]
  Subject<List<ProductSummary>> getSummary({
    @required String token,
    @required int menuId,
  }) {
    CancelToken cancelToken = new CancelToken();

    BehaviorSubject<List<ProductSummary>> subject = BehaviorSubject();

    subject.onCancel = () {
      if (cancelToken.isCancelled) cancelToken.cancel();
    };

    Options options = Options(
      headers: {"Content-Type": "application/json", "x-access-token": token},
      receiveTimeout: Constants.time_out,
      receiveDataWhenStatusError: true,
      validateStatus: (status) => true,
    );

    Dio()
        .get(
          ApiURL.summary + "/$menuId",
          options: options,
          cancelToken: cancelToken,
        )
        .then((response) {
          List<ProductSummary> summaries = [];
          if (ResponseUtil.valid(response)) {
            //

            response.data["data"].forEach((item) {
              Product product = Product.fromJson(item["product"]);

              List<User> users = List.from(
                item["listUser"].map((m) => User.fromJson(m)),
              );

              summaries.add(new ProductSummary(product, users));
            });

            subject.add(summaries);
          } else
            subject.addError(MenuException);
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }
}
