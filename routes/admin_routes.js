var express = require("express");
var exe = require("./db");
var router = express.Router();

router.get("/",function(req,res){
 res.render("admin/home.ejs");   
});

router.get("/introduction", async function(req,res)
{
   var data = await exe(`SELECT * FROM introduction`);
   var obj = {"intro":data[0]};
    res.render("admin/introduction.ejs",obj);   
   });

   router.post("/save_introduction", async function(req,res)
   {
    if(req.files)
    {
        if(req.files.user_photo)
        {
           var user_photo = new Date().getTime()+req.files.user_photo.name;
           req.files.user_photo.mv("public/"+user_photo);
           var sql = `UPDATE introduction SET user_photo='${user_photo}'
           WHERE intro_id = 1`;
           var data = await exe(sql);
            
        }
        if(req.files.resume)
        {
           var resume = new Date().getTime()+req.files.resume.name;
           req.files.resume.mv("public/"+resume);
           var sql = `UPDATE introduction SET resume='${resume}'
           WHERE intro_id = 1`;
           var data = await exe(sql);
        }
    }
  
    var d = req.body;
    var sql =`
          UPDATE introduction SET
    user_name = '${d.user_name}',
    tag_line = '${d.tag_line}',
    user_mobile = '${d.user_mobile}',
    user_email = '${d.user_email}',
    linkedin_link = '${d.linkedin_link}',
    instagram_link = '${d.instagram_link}',
    facebook_link = '${d.facebook_link}',
    twitter_link = '${d.twitter_link}',
   about_details = '${d.about_details}'

   WHERE 
   intro_id=1
   `;

   var data = await exe(sql);
   // res.send(data);
   res.redirect("/admin/introduction");

   });

   router.get("/education", async function(req,res)
   {
    var data = await exe(`SELECT * FROM qualification`);
    var obj = {"list":data};
    res.render("admin/education.ejs",obj);
   });

   router.post("/save_education", async function(req,res)
   {
      var d = req.body;

      var sql = `INSERT INTO qualification (qualification_name,university,
      passing_year,percentage)VALUES('${d.qualification}','${d.university}',
      '${d.passing_year}','${d.percentage}')`;
      
      var data = await exe(sql);
      // res.send(req.body);
      res.redirect("/admin/education");
   });

  router.get("/skills", async function(req,res)
  {
   var data = await exe(`SELECT * FROM skill`);
   res.render("admin/skills.ejs",{"skills":data});
  });


  router.post("/save_skill", async function(req,res)
  {
   var skill_image = '';
    if(req.files)
    { 
      if(req.files.skill_image)
      {
         skill_image = new Date().getTime()+req.files.skill_image.name;
         req.files.skill_image.mv("public/"+skill_image);
      }
    }

    var sql = `INSERT INTO skill (skill_image,skill_title)VALUES
    ('${skill_image}','${req.body.skill_title}')`;
    var data = await exe(sql); 
   // res.send(data);
   res.redirect("/admin/skills");
  });









   router.get("/projects", async function(req,res)
  {
   var data = await exe(`SELECT * FROM project`);
   res.render("admin/projects.ejs",{"projects":data});
  });


  router.post("/save_project", async function(req,res)
  {
   var project_image = '';
    if(req.files)
    { 
      if(req.files.project_image)
      {
         project_image = new Date().getTime()+req.files.project_image.name;
         req.files.project_image.mv("public/"+project_image);
      }
    }

    var sql = `INSERT INTO project (project_image,project_title)VALUES
    ('${project_image}','${req.body.project_title}')`;
    var data = await exe(sql); 
   // res.send(data);
   res.redirect("/admin/projects");
  });

module.exports = router;



// CREATE TABLE project(
//    project_id INT PRIMARY KEY AUTO_INCREMENT,
//    project_image TEXT,
//    project_title VARCHAR(200),
//    passing_year INT,
//    percentage VARCHAR(100),


// )

 