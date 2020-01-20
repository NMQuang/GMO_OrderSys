import 'dart:async';

import 'package:bloc/bloc.dart';

import './bloc.dart';
import '../../../providers/index.dart';
import '../../../repositories/indext.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  // Athentication bloc's repositories
  UserRepository _userRepository = new UserRepository(new UserProvider());

  @override
  AuthenticationState get initialState => Uninitialized(null);

  @override
  Stream<AuthenticationState> mapEventToState(
    AuthenticationEvent event,
  ) async* {
    if (event is LoggedIn) yield* _mapLoggedInEvent(event);
    if (event is UpdateState) yield* _mapUpdateStateEvent(event);
  }

  /// Handle event [LoggedIn]
  /// Called when user login
  Stream<AuthenticationState> _mapLoggedInEvent(LoggedIn event) async* {
    // Change state
    yield Authenticating(null);

    // User repository authentication
    _userRepository
        .authentication(code: event.code, password: event.password)
        .listen(
      (user) {
        if (user != null) {
          dispatch(UpdateState(authenticationState: Authenticated(user)));
        }
      },
      onError: (onError) {
        print(onError);
        dispatch(UpdateState(authenticationState: Unauthenticated(null)));
      },
    );
  }

  /// Handle event [UpdateState]
  Stream<AuthenticationState> _mapUpdateStateEvent(UpdateState event) async* {
    // Change state
    yield event.authenticationState;
  }
}
