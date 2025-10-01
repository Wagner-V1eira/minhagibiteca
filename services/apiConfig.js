const API_CONFIGS = {
  config1: 'http://localhost:3000/api',
  config2: 'http://localhost:3000', 
  config3: 'http://192.168.56.1:3000/api',
  config4: 'http://192.168.56.1:3000',
  config5: 'http://127.0.0.1:3000/api'
};

const API_ENDPOINTS = {
  register1: '/users/register',
  register2: '/user/register', 
  register3: '/register',
  login1: '/users/login',
  login2: '/user/login',
  login3: '/login'
};

export const CURRENT_API_BASE = API_CONFIGS.config1;
export const CURRENT_REGISTER_ENDPOINT = API_ENDPOINTS.register1;
export const CURRENT_LOGIN_ENDPOINT = API_ENDPOINTS.login1;

console.log('Configuração atual da API:');
console.log(`Base: ${CURRENT_API_BASE}`);
console.log(`Register: ${CURRENT_API_BASE}${CURRENT_REGISTER_ENDPOINT}`);
console.log(`Login: ${CURRENT_API_BASE}${CURRENT_LOGIN_ENDPOINT}`);