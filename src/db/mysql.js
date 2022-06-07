const mysql = require('mysql')
const {
    MYSQL_CONF
} = require('../conf/db')
// 创建链接
const con = mysql.createConnection(MYSQL_CONF)

con.connect()

// 同意执行sql函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result);
        })
    })
    return promise
}
// con.end()

module.exports = {
    exec
}