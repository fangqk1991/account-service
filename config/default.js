module.exports = {
  adminPort: 13300,
  adminBaseURL: 'http://localhost:13299',
  adminJwtSecret: '<TmplDemo Random 32>',
  mysql: {
    accountDB: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      database: 'demo_db',
      username: 'root',
      password: '',
    },
  },
  adminSSO: {
    baseURL: 'https://sso.example.com',
    clientId: '<clientId>',
    clientSecret: '<clientSecret>',
    authorizePath: '/api/v1/oauth/authorize',
    tokenPath: '/api/v1/oauth/token',
    logoutPath: '/api/v1/logout',
    scope: 'basic',
    callbackUri: 'http://localhost:8080/api/v1/handleSSO',
    userInfoURL: 'https://sso.example.com/api/v1/oauth/user-info',
  },
}
