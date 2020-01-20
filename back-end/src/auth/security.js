const security = {};

// List contain unauthentication url
security.authenticationUrl = ['/users/register', '/users/login'];

// List url for user
security.urlForUser = ['/users/login', '/users/register', '/menu', '/menu/detail', '/order', '/order/detail', '/order/update', '/users/uploadAvatar', '/users/changePassword','/menu/find'];

// List code for admin
security.codeAdmin = ['1157', '1835', '2395'];

export default security;