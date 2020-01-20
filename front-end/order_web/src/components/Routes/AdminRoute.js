import { Route, Redirect } from "react-router-dom";

/**
 * Admin Route
 */
const AdminRoute = ({ component: Comp, role, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return role === "Admin" ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: {
                prevLocation: path,
                error: "Permission Denied.",
              },
            }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;
