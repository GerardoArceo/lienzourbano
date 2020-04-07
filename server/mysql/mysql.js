//REQUIREDS
const mysql = require('mysql');
const getQuery = require('./funciones');

let pool;
let datosConexion = {
    connectionLimit: 10,
    host: '144.217.13.146',
    port: 3306,
    user: 'root',
    password: 'Gutopia12#$'
};

let executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err || typeof connection == 'undefined') {
                console.log("Error de conexión: ", err);
                reject();
            }
            connection.query(query, function(err2, results) {
                connection.release();
                if (err2) {
                    error = true;
                    console.log("Error con el query: ", query, " ERROR:", err2);
                    reject();
                }
                resolve(results);
                connection.destroy();
            });
        });
    });
};

let executeAction = async(action, params, data) => {
    console.log(datosConexion);
    datosConexion.database = 'lienzoUrbano';
    pool = mysql.createPool(datosConexion);
    for (const i in params) //Prevenir SQLi
        params[i] = pool.escape(params[i]);
    let alerta = {
        ok: true,
        type: 'success',
        title: 'ÉXITO'
    };

    let query = getQuery(action, params, data);
    if (query.query != null) {
        try {
            let result = (await executeQuery(query.query));
            alerta.text = query.texto_ok;
            return [alerta, result];
        } catch (Exception) {
            query.texto_error = `Error en la base de datos`;
        }
    }

    alerta = {
        ok: false,
        type: 'error',
        title: 'ERROR',
        text: query.texto_error
    };
    return [alerta, {}];

};

module.exports = {
    executeAction
};