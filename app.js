// App.js starter code copied from https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/
var express = require('express');               // We are using the express library for the web server
var app = express();                            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 9116;                                    // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res){  
    let query1 = "SELECT * FROM Guardians;";               
    let query2 = "SELECT * FROM Ranks";
    let query3 = "SELECT Guardians.guardian_id, Guardians.name, Ranks.rank_id, Ranks.title FROM Guardians INNER JOIN Guardian_rank ON Guardians.guardian_id = Guardian_rank.guardian_id INNER JOIN Ranks ON Guardian_rank.rank_id = Ranks.rank_id ORDER BY Guardians.guardian_id;";

    db.pool.query(query1, function(error, rows, fields){    
        let guardians = rows;

        db.pool.query(query2, (error, rows, fields) => { 
            let ranks = rows;
            
            // Map ranks_id to title for easier viewing
            let rankmap = {}
            ranks.map(rank =>{
                let id = parseInt(rank.rank_id, 10);

                rankmap[id] = rank["title"];
            })
            guardians = guardians.map(guardian =>{
                return Object.assign(guardian, {rank_id: rankmap[guardian.rank_id]})
            })

            db.pool.query(query3, function(error, rows, fields){
                return res.render('index', {data:guardians, data2: rows, ranks: ranks})
            })
        })  
    })      
});  

app.get('/guardian_rank', function(req, res){
    let query1 = `SELECT * FROM Guardians;`;
    let query2 = `SELECT * FROM Ranks;`;
    let query3 = `SELECT Guardians.guardian_id, Guardians.name, Ranks.rank_id, Ranks.title FROM Guardians INNER JOIN Guardian_rank ON Guardians.guardian_id = Guardian_rank.guardian_id INNER JOIN Ranks ON Guardian_rank.rank_id = Ranks.rank_id ORDER BY Guardians.guardian_id;`;
    
    db.pool.query(query1, function(error, rows, fields){
        let guardians = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let ranks = rows;
    
            db.pool.query(query3, function(error, rows, fields){
                let gr_data = rows;
                return res.render('guardian_rank', {guardians, ranks, gr_data});
            })
        })
    })

    
});

app.get('/ranks', function(req, res){
    let query2 = `SELECT * FROM Ranks;`;

    db.pool.query(query2, function(error, rows, fields){

        res.render('ranks', {r_data: rows});
    })
});

app.get('/weapons', function(req, res){
    let query = `SELECT * FROM Weapons;`;

    db.pool.query(query, function(error, rows, fields){
        res.render('weapons', {w_data: rows});
    })
})
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
    query1 = `INSERT INTO Guardians (name, glimmer_balance) VALUES ('${data.name}', '${glimmer_balance}')`;
    
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
            db.pool.query(`INSERT INTO Guardian_rank(guardian_id, rank_id) VALUES ((SELECT guardian_id FROM Guardians WHERE name = '${data.name}'), 1);`) 
            //query2 = `SELECT * FROM Guardians;`;
            query4 = `SELECT * FROM Guardians INNER JOIN Guardian_rank on Guardians.guardian_id = Guardian_rank.guardian_id;`
            db.pool.query(query4, function(error, rows, fields){
    
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

app.post('/add-gr-ajax', function(req, res){
    let gr_data = req.body;
    let gID = parseInt(gr_data.guardian_id)
    let rID = parseInt(gr_data.rank_id)

    let query1 = `INSERT INTO Guardian_rank(guardian_id, rank_id) VALUES ('${gID}', '${rID}');`;
    db.pool.query(query1, function(error, rows, fields){
        
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        
        else{
            query2 = `SELECT * FROM Guardian_rank INNER JOIN Guardians ON Guardian_rank.guardian_id = Guardians.guardian_id INNER JOIN Ranks ON Guardian_rank.rank_id = Ranks.rank_id;`;
            query5 = `SELECT * FROM Guardian_rank;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if(error){
                    console.log(error);
                    res.sendStatus(400);
                }

                else{
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-r-ajax', function(req, res){
    let r_data = req.body;

    let query1 = `INSERT INTO Ranks(title) VALUES ('${r_data.title}');`;
    db.pool.query(query1, function(error, rows, fields){
        
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        
        else{
            query2 = `SELECT * FROM Ranks;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if(error){
                    console.log(error);
                    res.sendStatus(400);
                }

                else{
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-weapon-ajax', function(req, res){
    let w_data = req.body;

    let query1 = `INSERT INTO Weapons(name, type, slot, element, description, rank_req, price) 
    VALUES ('${w_data.name}', '${w_data.type}', '${w_data.slot}', '${w_data.element}', 
    '${w_data.description}', '${w_data.rank_req}', '${w_data.price}');`;

    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        
        else{
            query2 = `SELECT * FROM Weapons;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if(error){
                    console.log(error);
                    res.sendStatus(400);
                }

                else{
                    res.send(rows);
                }
            })
        }
    })
})

app.delete('/delete-guardian-ajax/', function(req, res, next){
    let data = req.body;
    let guardian_id = parseInt(data.guardian_id);
    let deleteRank = `DELETE FROM Guardian_rank WHERE guardian_id = ?`;
    let deleteGuardian = `DELETE FROM Guardians WHERE guardian_id = ?`;
  
    // Run the 1st query
    db.pool.query(deleteRank, [guardian_id], function(error, rows, fields){
        if (error){
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else{
            // Run the second query
            db.pool.query(deleteGuardian, [guardian_id], function(error, rows, fields) {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } 
                else{
                    res.sendStatus(204);
                }
            })
        }
    })
});

app.delete('/delete-rank-ajax', function(req, res, next){
    let r_data = req.body;
    let rank_id = parseInt(r_data.rank_id)
    let deleteGR = `DELETE FROM Guardian_rank WHERE rank_id = ?`; 
    let deleteRank = `DELETE FROM Ranks WHERE rank_id = ?`;

    db.pool.query(deleteGR, [rank_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }

        else{
            db.pool.query(deleteRank, [rank_id], function(error, rows, fields) {
                if(error){
                    console.log(error);
                    res.sendStatus(400);

                }
                else{
                    res.sendStatus(204);
                }
            })
        }
    })
});

app.delete('/delete-weapon-ajax', function(req, res, next){
    let w_data = req.body;
    let weapon_id = parseInt(w_data.weapon_id);
    let deleteWeapon = `DELETE FROM Weapons WHERE weapon_id = ?`;

    db.pool.query(deleteWeapon, [weapon_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);

        }
        else{
            res.sendStatus(204);
        }
    })
})

app.put('/put-guardian-ajax', function(req, res, next){
    let data = req.body;

    let guardian_id = parseInt(data.guardian_id);
    let name = data.name;
    let glimmer_balance = parseInt(data.glimmer_balance);
    if (isNaN(glimmer_balance))
    {
        glimmer_balance = 0;
    }

    let new_rank = parseInt(data.rank_id);

    queryUpdateGuardian = `UPDATE Guardians SET name = ?, glimmer_balance = ? WHERE Guardians.guardian_id = ?`;
    queryUpdateGuardianRanks = `INSERT INTO Guardian_rank (guardian_id, rank_id) VALUES('${guardian_id}', '${new_rank}')`;

    db.pool.query(queryUpdateGuardian, [name, glimmer_balance, guardian_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else{
            db.pool.query(queryUpdateGuardianRanks, function(error, rows, fields){
                if(error){
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    query2 = `SELECT guardian_id, name, glimmer_balance FROM Guardians WHERE Guardians.guardian_id = ?;`;
                    db.pool.query(query2,[guardian_id], function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        console.log(rows);
                        res.send(rows);
                    
                    }
                })
            }
            })
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});