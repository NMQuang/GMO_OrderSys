import '../actions/index.dart';
import '../states/user_state.dart';

// User reducer
UserState userReducer(UserState previousState, dynamic action) {
  // Define new state
  UserState newState = previousState;

  // Add user
  if (action is AddUserAction) {
    newState = AuthenticationAuthenticated(action.user);
    return newState;
  }

  // Remove user
  if (action is RemoveUserAction) {
    newState = AuthenticationUninitialized(null);
    return newState;
  }

  // Case action invalid return null
  return newState;
}
