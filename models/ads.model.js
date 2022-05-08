const sql = require("./db.js");

const Ads = function(ad) {
    this.title = ad.title;
    this.link = ad.link;
    this.img = ad.img;
    this.start_date = ad.start_date;
    this.end_date = ad.end_date;
    this.is_confirmed = ad.is_confirmed;
    this.created_by = ad.created_by;
    this.updated_on = ad.updated_on;
    this.updated_by = ad.updated_by;
    this.is_trash = ad.is_trash;
};
Ads.fetchAll = (result) => {
    let query = "SELECT * FROM ads where is_confirmed = 1 AND start_date <= now() AND end_date >= now() AND is_trash != 1 ";
    sql.query(query, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
module.exports = Ads;