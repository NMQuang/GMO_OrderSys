import 'dart:async';

import 'package:bloc/bloc.dart';

import './bloc.dart';
import '../../../providers/index.dart';
import '../../../repositories/indext.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  UserRepository _userRepository = new UserRepository(new UserProvider());

  @override
  RegisterState get initialState => InitialRegister();

  @override
  Stream<RegisterState> mapEventToState(
    RegisterEvent event,
  ) async* {
    if (event is Submitted) yield* _mapSubmittedEvent(event);
    if (event is UpdateState) yield* _mapUpdateStateEvent(event);
  }

  /// handle event [Submitted]
  Stream<RegisterState> _mapSubmittedEvent(Submitted event) async* {
    yield Registing();

    // User repository register
    _userRepository
        .register(code: event.code, name: event.name, password: event.password)
        .listen(
      (user) {
        if (user != null) {
          dispatch(UpdateState(registerState: Registed()));
        }
      },
      onError: (error) {
        print(error);
        dispatch(UpdateState(registerState: UnRegisted()));
      },
    );
  }

  /// Handle event [UpdateState]
  Stream<RegisterState> _mapUpdateStateEvent(UpdateState event) async* {
    // Change state
    yield event.registerState;
  }
}
