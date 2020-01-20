class ApiURL {
  // Ip server url
  // static const String ip_server = "http://localhost:3000";
  static const String ip_server = "http://10.1.10.244:3000";

  // Login url (Authentication)
  static const String login = "$ip_server/users/login";

  // Register url (create user)
  static const String register = "$ip_server/users/register";

  // Get all menu url
  static const String get_all_menu = "$ip_server/menus";

  // Get menu detail url
  static const String get_menu_detail = "$ip_server/menus/detail";

  // Create order url
  static const String create_order = "$ip_server/menus/order";

  // Get order detail url
  static const String get_order_detail = "$ip_server/menus/order/detail";

  // Get order detail url
  static const String update_order = "$ip_server/menus/order/update";

  // Get order detail url
  static const String summary = "$ip_server/menus/summary";

  // etc
}
