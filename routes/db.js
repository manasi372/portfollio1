var mysql = require("mysql");
var util = require("util");
var conn = mysql.createConnection({
    "host":"bq61lohdv7rvlobnv5dz-mysql.services.clever-cloud.com",
    "user":"u2jv3n6f3elooes1",
    "password":"HJ6YQ1x9usD45RmU55UU",
    "database":"bq61lohdv7rvlobnv5dz"

});

var exe = util.promisify(conn.query).bind(conn);


module.exports = exe;
