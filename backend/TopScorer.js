

class TopScorer  {
    constructor(){
        this.apiUrl = "halland";
    }
    getTable = (req , res) => {
        try{
        
            res.status(200).json(this.apiUrl);
        }
        catch(error){
            res.status(500).json({message : "Error retrieving leagueTable"});
        }
    }
}
module.exports = new TopScorer;