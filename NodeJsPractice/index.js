const mysql=require('mysql');
const express=require('express');
const bodyparser=require('body-parser');

var app= express();

app.use(bodyparser.json());

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'EmployeeDB'
});

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log('Database connection successful');
    }
    else{
        console.log('DB Connection failed \n Error '+Json.stringyfy(err,undefined,2));
    }
});;

app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

//get all employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * from employee',(err,rows,feilds)=>{
        if(!err)
            res.send(rows);
        else  
            console.log(err);
    })
});
//get particular employee with id
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * from employee where EmpID =?',req.params.id,(err,rows,feilds)=>{
        if(!err)
            res.send(rows);
        else  
            console.log(err);
    })
});
//DELETE an employee with given id
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employee where EmpID =?',req.params.id,(err,rows,feilds)=>{
        if(!err)
            res.send("Profile Delete Successfully");
        else  
            console.log(err);
    })
});
//SAVE the Employee Details in the Table
app.post('/employees',(req,res)=>{
    var input=JSON.parse(JSON.stringify(req.body));
    console.log(input);
    console.log(input.EmpID);
    console.log(input.Name);
    console.log(input.EmpCode);
    console.log(input.Salary);
    var insertVal=[[input.EmpID,input.Name,input.EmpCode,input.Salary]];    
    mysqlConnection.query("INSERT INTO employee(EmpID,Name,EmpCode,Salary) VALUES ? ",[insertVal],(err,rows,fields)=>{
        if(!err){
            res.status(201);
            console.log("Employee Details Added Successfully");
            res.redirect('/employees');
            //console.log("1 record inserted");
        }
        else
            console.log("Error Inserting :%s ", err)
    })
})