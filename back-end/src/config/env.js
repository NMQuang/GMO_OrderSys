const env = {
    database: 'db_order',
    username: 'runsystem',
    password: 'gmo123',
    host: '10.1.10.59',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        require: 300000,
        idle: 10000
    }
};

export default env;