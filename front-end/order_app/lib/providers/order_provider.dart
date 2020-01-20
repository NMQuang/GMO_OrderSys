import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:rxdart/rxdart.dart';

import '../models/index.dart';
import '../util/index.dart';

class OrderProvider {
  /// Return [subject] handled [response], [exception]
  ///
  /// Params `String` [token]
  Subject<Order> getOrder({
    @required String token,
    @required int userId,
    @required int menuId,
  }) {
    CancelToken cancelToken = new CancelToken();

    BehaviorSubject<Order> subject = BehaviorSubject();

    subject.onCancel = () {
      if (cancelToken.isCancelled) cancelToken.cancel();
    };

    var data = {"userId": userId, "menuId": menuId};

    Options options = Options(
      headers: {"Content-Type": "application/json", "x-access-token": token},
      receiveTimeout: Constants.time_out,
      receiveDataWhenStatusError: true,
      validateStatus: (status) => true,
    );

    Dio()
        .post(
          ApiURL.get_order_detail,
          data: data,
          options: options,
          cancelToken: cancelToken,
        )
        .then((response) {
          if (ResponseUtil.valid(response)) {
            List data = response.data['data']..toList();

            if (data.isNotEmpty)
              subject.add(Order.fromJson(data[0]));
            else
              subject.addError(OrderException);
          } else
            subject.addError(OrderException);
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }

  /// Return [subject] handled [response], [exception]
  ///
  /// Params `String` [token]
  Subject<bool> createOrder({
    @required String token,
    @required int userId,
    @required int productId,
    @required int menuId,
  }) {
    CancelToken cancelToken = new CancelToken();

    BehaviorSubject<bool> subject = BehaviorSubject();

    subject.onCancel = () {
      if (cancelToken.isCancelled) cancelToken.cancel();
    };

    var data = {
      "productId": productId,
      "menuId": menuId,
      "userId": userId,
    };

    Options options = Options(
      headers: {"Content-Type": "application/json", "x-access-token": token},
      receiveTimeout: Constants.time_out,
      receiveDataWhenStatusError: true,
      validateStatus: (status) => true,
    );

    Dio()
        .post(
          ApiURL.create_order,
          data: data,
          options: options,
          cancelToken: cancelToken,
        )
        .then((response) {
          ResponseUtil.valid(response)
              ? subject.add(true)
              : subject.addError(OrderException);
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }

  /// Return [subject] handled [response], [exception]
  ///
  /// Params `String` [token]
  Subject<bool> updateOrder({
    @required String token,
    @required int orderId,
    @required int productId,
    @required int menuId,
  }) {
    CancelToken cancelToken = new CancelToken();

    BehaviorSubject<bool> subject = BehaviorSubject();

    subject.onCancel = () {
      if (cancelToken.isCancelled) cancelToken.cancel();
    };

    var data = {
      "productId": productId,
      "menuId": menuId,
      "orderId": orderId,
    };

    Options options = Options(
      headers: {"Content-Type": "application/json", "x-access-token": token},
      receiveTimeout: Constants.time_out,
      receiveDataWhenStatusError: true,
      validateStatus: (status) => true,
    );

    Dio()
        .post(
          ApiURL.update_order,
          data: data,
          options: options,
          cancelToken: cancelToken,
        )
        .then((response) {
          ResponseUtil.valid(response)
              ? subject.add(true)
              : subject.addError(OrderException);
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }
}
