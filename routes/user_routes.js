var express =require("express");
var exe = require("./db");
var router = express.Router();

router.get("/", async function(req,res)
{
    var intro = await exe(`SELECT * FROM introduction`);
    var edu = await exe(`SELECT * FROM qualification`);
    var skills = await exe(`SELECT * FROM skill`);
    var skills = await exe(`SELECT * FROM project`);

    var obj = {"intro":intro[0],"edu":edu,"skill":skills};
    res.render("user/home.ejs",obj);
 
 });

module.exports = router;