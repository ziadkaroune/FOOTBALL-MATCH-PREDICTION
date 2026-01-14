const express = require('express')
const  leagueTable = require('./LeagueTable');
const TopScorer = require('./TopScorer')

const app = express();
const PORT = 3000;


app.get('/table' , leagueTable.getTable);
app.get('/topScorer' , TopScorer.getTable);

app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})