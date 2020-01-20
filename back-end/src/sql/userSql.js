// defind SQL of user
const userSql = {};

/**
 * Check user id exist in database
 */
userSql.checkUserIdExist = 
`
SELECT id,
       avatar
FROM users
WHERE users.id = :userId
`

/**
 * Upload avatar
 */
userSql.uploadAvatar = 
`
UPDATE users
SET avatar = :avatar
WHERE id = :userId
`

/**
 * Get info user by user id
 */
userSql.getUserById = 
`
SELECT *
FROM users
WHERE id = :userId
`

/**
 * Change password
 */
userSql.changePassword = 
`
UPDATE users
SET password = :hashPassword
WHERE id = :userId
`

export default userSql;