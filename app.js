// App.js starter code copied from https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 9111;                 // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Guardians;";               // Define our query
        let query2 = "SELECT * FROM Ranks";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let guardians = rows;

            db.pool.query(query2, (error, rows, fields) => { 
                let ranks = rows;

                
                let rankmap = {}
                ranks.map(rank =>{
                    let id = parseInt(rank.rank_id, 10);

                    rankmap[id] = rank["title"];
                })
                guardians = guardians.map(guardian =>{
                    return Object.assign(guardian, {rank_id: rankmap[guardian.rank_id]})
                })
                

                return res.render('index', {data: guardians, ranks: ranks});                  // Render the index.hbs file, and also send the renderer
            })  

        })                                                      
    });                                        

app.post('/add-guardian-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Capture NULL values
    let glimmer_balance = parseInt(data.glimmer_balance);
    if (isNaN(glimmer_balance))
    {
        glimmer_balance = 0
    }
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Guardians (name, glimmer_balance) VALUES ('${data.name}', ${glimmer_balance})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * 
            query2 = `SELECT * FROM Guardians;`;
            db.pool.query(query2, function(error, rows, fields){
    
                // If there was an error on the second query, send a 400
                if (error) {
                        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                    
                }
            })  
        }
    })
});

app.delete('/delete-guardian-ajax/', function(req,res,next){
    let data = req.body;
    let guardian_id = parseInt(data.guardian_id);
    let deleteRank = `DELETE FROM Guardian_rank WHERE guardian_id = ?`;
    let deleteGuardian = `DELETE FROM Guardians WHERE guardian_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteRank, [guardian_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteGuardian, [guardian_id], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});



