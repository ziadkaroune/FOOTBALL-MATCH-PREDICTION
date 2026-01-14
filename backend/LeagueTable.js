

class LeagueTables  {
    constructor(){
        this.apiUrl = "ziko";
    }
    getTable = (req , res) => {
        try{
            if(this.apiUrl != "xc")
                    throw new Error("harawkan");
            res.status(200).json(this.apiUrl);
        }
        catch(error){
            res.status(500).json({message : "Error retrieving leagueTable"});
        }
    }
}
module.exports = new LeagueTables;