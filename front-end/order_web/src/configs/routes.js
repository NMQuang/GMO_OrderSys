import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Main/HomePage";
import MenuDetailPage from "../pages/Menu/MenuDetailPage";
import MenuPage from "../pages/Menu/MenuPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ProductPage from "../pages/Product/ProductPage";
import CreateProductPage from "../pages/Product/CreateProductPage";
import EditProductPage from "../pages/Product/EditProductPage";
import CreateMenuPage from "../pages/Menu/CreateMenuPage";
import EditMenuPage from "../pages/Menu/EditMenuPage";
import CloneMenuPage from "../pages/Menu/CloneMenuPage";
import SummaryPage from "../pages/Summary/SummaryPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import UserProfilePage from "../pages/User/UserProfilePage";
import MenuListAllPage from "../pages/Menu/MenuListAllPage";
// define route for each page
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <LoginPage />
  },
  {
    path: "/home",
    exact: true,
    main: () => <HomePage />,
    loggedIn: true
  },
  {
    path: "/menu/list",
    exact: true,
    main: listMenu => <MenuListAllPage listMenu={listMenu} />,
    loggedIn: true
  },
  {
    path: "/summary/:menuId",
    exact: false,
    main: menuId => <SummaryPage menuId={menuId} />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/menu",
    exact: true,
    main: () => <MenuPage />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/menu/create",
    exact: true,
    main: () => <CreateMenuPage />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/menu/edit/:menuId",
    exact: false,
    main: menuId => <EditMenuPage menuId={menuId} />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/menu/clone/:menuId",
    exact: false,
    main: menuId => <CloneMenuPage menuId={menuId} />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/product",
    exact: true,
    main: () => <ProductPage />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/product/create",
    exact: true,
    main: () => <CreateProductPage />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/product/edit/:productId",
    exact: false,
    main: productId => <EditProductPage productId={productId} />,
    loggedIn: true,
    isAdmin: true
  },
  {
    path: "/menu/detail/:menuId",
    exact: false,
    main: menuId => <MenuDetailPage menuId={menuId} />,
    loggedIn: true
  },
  {
    path: "/register",
    exact: true,
    main: () => <RegisterPage />
  },
  {
    path: "/user/:userId",
    exact: false,
    main: userId => <UserProfilePage userId={userId} />,
    loggedIn: true
  },
  {
    path: "*",
    exact: false,
    main: () => <NotFoundPage />
  },
  {
    path: "/not-found",
    exact: true,
    main: () => <NotFoundPage />
  }
];

export default routes;
