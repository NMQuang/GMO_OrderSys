import 'package:dio/dio.dart';
import 'package:rxdart/rxdart.dart';

import '../models/index.dart';
import '../util/index.dart';

class UserProvider {
  /// Return [subject] handled [response], [exception]
  ///
  /// Params `int` [code], `String` [password], [username]
  Subject<User> register({
    String code,
    String password,
    String name,
  }) {
    CancelToken token = new CancelToken();

    // Define data request
    var data = {"code": code, "password": password, "name": name};

    BehaviorSubject<User> subject = BehaviorSubject();

    subject.onCancel = () => (!token.isCancelled) ? token.cancel() : null;

    Options options = Options(
      receiveTimeout: Constants.time_out,
      receiveDataWhenStatusError: true,
      validateStatus: (status) => true,
    );

    Dio()
        .post(
          ApiURL.register,
          data: data,
          options: options,
          cancelToken: token,
        )
        .then((response) {
          if (response.statusCode == 200 && response.data != null) {
            subject.add(User.fromJson(response.data["data"])..code = code);
          } else
            subject.addError(AuthenticationException());
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }

  /// Return [subject] handled [response], [exception]
  ///
  /// Params `String` [code], [password]
  Subject<User> login({
    String code,
    String password,
  }) {
    CancelToken token = new CancelToken();

    // Define data request
    var data = {"code": code, "password": password};

    BehaviorSubject<User> subject = BehaviorSubject();

    // Close subject on done or cancel
    subject.onCancel = () => (!token.isCancelled) ? token.cancel() : null;

    // Setup options

    // Call and handle response
    Dio()
        .post(
          ApiURL.login,
          data: data,
          cancelToken: token,
          options: Options(receiveTimeout: Constants.time_out),
        )
        .then((response) {
          if (response.statusCode == 200 && response.data != null)
            subject.add(User.fromJson(response.data["data"]));
          else
            subject.addError(AuthenticationException());
        })
        .catchError((e) => !subject.isClosed ? subject.addError(e) : null)
        .whenComplete(() => subject.done);

    return subject;
  }
}
