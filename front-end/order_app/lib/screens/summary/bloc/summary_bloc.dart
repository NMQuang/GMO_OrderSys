import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:rxdart/rxdart.dart';

import './bloc.dart';
import '../../../models/index.dart';
import '../../../providers/index.dart';
import '../../../repositories/indext.dart';

class SummaryBloc extends Bloc<SummaryEvent, SummaryState> {
  User _user;
  Menu _menu;

  MenuRepository _menuRepository = new MenuRepository(new MenuProvider());

  BehaviorSubject<List<ProductSummary>> _subjectSummaries = BehaviorSubject();

  Stream<List<ProductSummary>> get summariesStream => _subjectSummaries.stream;
  // BehaviorSubject<Product> _orderSubject = BehaviorSubject();

  @override
  SummaryState get initialState => InitialSummaryState();

  @override
  Stream<SummaryState> mapEventToState(
    SummaryEvent event,
  ) async* {
    if (event is InitData) yield* mapInitDataEvent(event);
    if (event is UpdateState) yield* mapUpdateStateEvent(event);
    if (event is GetSummary) yield* mapGetSummaryEvent(event);
  }

  /// Handle event [InitData]
  /// Called when data init
  Stream<SummaryState> mapInitDataEvent(InitData event) async* {
    _user = event.user;
    _menu = event.menu;
  }

  /// Handle event [UpdateState]
  Stream<SummaryState> mapUpdateStateEvent(UpdateState event) async* {}

  /// Handle event [GetSummary]
  Stream<SummaryState> mapGetSummaryEvent(GetSummary event) async* {
    var sub = _menuRepository.getSummary(
      menuId: _menu.id,
      token: _user.accessToken,
    );

    sub.listen((onData) {
      // print(onData);
      _subjectSummaries.add(onData);
    });
    sub.handleError((onError) {
      print(onError);
    });
    sub.doOnDone(() {
      if (!sub.isClosed) sub.close();
    });
  }

  @override
  void dispose() {
    super.dispose();
    _subjectSummaries.close();
  }
}
