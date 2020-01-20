import 'package:dio/dio.dart';

import 'constants.dart';

class ResponseUtil {
  /// Common check `response` [Response<dynamic>] form Dio is valid
  static bool valid(Response<dynamic> response) =>
      response.statusCode == 200 &&
      response.data != null &&
      response.data["resultCode"] == Constants.success_result_code;
}
