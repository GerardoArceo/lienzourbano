// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 1000 * 60 * 60 * 24 * 30;

// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || "s3m1ll4_d3_d3s4rr0ll0";


// ============================
//  Clave del recaptcha
// ============================
process.env.RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;

// ============================
//  Base de datos
// ============================
process.env.HOST_DB = process.env.HOST_DB || "144.217.13.146";
process.env.PORT_DB = process.env.PORT_DB || 3306;
process.env.USER_DB = process.env.USER_DB || "root";
process.env.PASS_DB = process.env.PASS_DB || "Gutopia12#$";