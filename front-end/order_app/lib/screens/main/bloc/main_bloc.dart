import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:rxdart/rxdart.dart';

import './bloc.dart';
import '../../../models/index.dart';
import '../../../providers/index.dart';
import '../../../repositories/indext.dart';

class MainBloc extends Bloc<MainEvent, MainState> {
  MenuRepository _menuRepository = new MenuRepository(new MenuProvider());

  User _user;

  BehaviorSubject<List<Menu>> _subjectMenues = BehaviorSubject();

  Stream<List<Menu>> get menues => _subjectMenues.stream;

  @override
  MainState get initialState => InitialMainState();

  @override
  Stream<MainState> mapEventToState(
    MainEvent event,
  ) async* {
    if (event is InitData) yield* mapInitDataEvent(event);
    if (event is GetAllMenu) yield* _mapGetAllMenuEvent(event);
  }

  /// Handle event [GetAllMenu]
  /// Called when get all menu
  Stream<MainState> _mapGetAllMenuEvent(GetAllMenu event) async* {
    getAllMenu();
  }

  /// Handle event [InitData]
  /// Called when Init data
  Stream<MainState> mapInitDataEvent(
    InitData event,
  ) async* {
    _user = event.user;
  }

  getAllMenu() {
    _menuRepository.getAllMenu(token: _user.accessToken).listen(
      (menues) {
        _subjectMenues.add(menues);
      },
      onError: (error) {},
      onDone: () {},
    );
  }

  @override
  void dispose() {
    super.dispose();
    _subjectMenues.close();
  }
}
