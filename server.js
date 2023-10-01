const express=require("express")
const mysql=require("mysql")
const cors=require("cors")

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"samsung@6600",
    database:"concert",
    debug:true
});

app.post('/Signup', (req, res) => {
    
      const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
      
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
      
      db.query(sql, [name,email,password], (err, data) => {
        if (data) {
          
          res.send(data);
          console.log("Data inserted successfully:", data);
        }
        else{
            res.send({message:"Error "})

        }
        
        
      });
   
  });

  app.post('/Login', (req, res) => {
    
    const sql = "SELECT * FROM Login WHERE email=? AND password=?";
    
     
      const email=req.body.email;
      const password=req.body.password;
    
    db.query(sql, [email,password], (err, data) => {
      if (err) {
        
        console.error("Error", err);

        console.log("Error");
      }
      else{
        if(data.length>0){
            console.log("Login succesful")
            res.send(data)

        }
        else{
            res.send({message:"Incorrect username or password"})
        }
          

      }
      
      
    });
 
});

app.post('/Create', (req, res) => {
    
  const sql = "INSERT INTO CMS(cname ,cimage,tname,timage, date, time, ticket)VALUES(?,?,?,?,?,?,?)";
  
   
    const cname=req.body.cname;
    const cimage=req.body.cimage;
    const tname=req.body.tname;
    const timage=req.body.timage;
    const date=req.body.date;
    const time=req.body.time;
    const ticket=req.body.ticket;
   
  
  db.query(sql, [cname,cimage,tname,timage,date,time,ticket], (err, data) => {
    if (err) {
      
      req.setEncoding({err:err});
      console.log("Error");
    }
    else{
      if(data.length>0){
          console.log("create succesful")
          res.send(data)

      }
      else{
          res.send({message:"Incorrect username or password"})
      }
        

    }
    
    
  });

});

app.get('/Created', (req, res) => {
  const sql = "SELECT * FROM cms WHERE id = (SELECT MAX(id) FROM cms);";
  
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to retrieve data" });
    } else {
      if (data.length > 0) {
        console.log("Data retrieved successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});

app.get('/ShowAndId', (req, res) => {
  const sql = "SELECT * FROM cms;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.post('/Edit2', (req, res) => {
    
  const sql = "UPDATE cms SET  cname=? ,cimage=?,tname=?,timage=?, date=?, time=?, ticket=? WHERE id=?;";
  
   
    const id=req.body.id;
    const cname=req.body.cname;
    const cimage=req.body.cimage;
    const tname=req.body.tname;
    const timage=req.body.timage;
    const date=req.body.date;
    const time=req.body.time;
    const ticket=req.body.ticket;
   
  
  db.query(sql, [cname,cimage,tname,timage,date,time,ticket,id], (err, data) => {
    if (err) {
      
      req.setEncoding({err:err});
      console.log("Error");
    }
    else{
      if(data.affectedRows>0){
          console.log("create succesful")
          res.send(data)
          console.log(data)

      }
      else{
          res.send({message:"Incorrect username or password"})
      }
        

    }
    
    
  });

});
app.post('/ShowAndDelete', (req, res) => {
  const sql = "DELETE FROM cms WHERE id=?;";
  const id=req.body.id;
 
  
  db.query(sql,[id], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data deleted successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.post('/ShowAndBook', (req, res) => {
    
  const sql = "INSERT INTO tms(tid ,username,password,ticket)VALUES(?,?,?,?);";
  
   
    const tid=req.body.tid;
    const username=req.body.username;
    const password=req.body.password;
    const ticket=req.body.ticket;
    // const date=req.body.date;
    // const time=req.body.time;
    // const ticket=req.body.ticket;
   
  
  db.query(sql, [tid,username,password,ticket], (err, data) => {
    if (err) {
      
      req.setEncoding({err:err});
      console.log("Error");
    }
    else{
      if(data.length>0){
          console.log("booked succesful")
          res.send(data)

      }
      else{
          res.send({message:"Incorrect username or password"})
      }
        

    }
    
    
  });

});
app.get('/Show', (req, res) => {
  const sql = "SELECT * FROM cms;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.get('/Booked', (req, res) => {
  const sql = "SELECT * FROM tms WHERE id = (SELECT MAX(id) FROM tms);";
  
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to retrieve data" });
    } else {
      if (data.length > 0) {
        console.log("Data retrieved successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});


app.post('/DelTicket', (req, res) => {
  const sql = "DELETE FROM tms WHERE id=?;";
  const id=req.body.id;
 
  
  db.query(sql,[id], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data deleted successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
  
db.connect((err,values) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
    console.log('Connected to database!');
    app.listen(8081, () => {
      console.log("Server is listening on port 8081",values);
    });
  });
 
  