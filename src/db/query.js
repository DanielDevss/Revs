const db = require('./db');


function insert(table, body, values){
    db.query(`INSERT INTO ${table}${body} VALUES${values};`, (err,rows) => {
        if(err) {console.log(err)}else{
            console.log('insert success')
        }
    })
}

function deleteRegistro(table, where, category = null){
    if (category != null) {
        db.query(`DELETE FROM ${table} WHERE ${where}`, (err, rows) => {
            if(err) {console.log(err)}else{
                db.query(`DELETE FROM webs WHERE category = "${category}";`)
                console.log('delete success')
            }
        });
    }else{
        db.query(`DELETE FROM ${table} WHERE ${where}`, (err, rows) => {
            if(err) {console.log(err)}else{
                console.log('delete success')
            }
        });
    }
};

function updateRegistro(table, values, id, category = null){
    if (category != null){
        db.query(`SELECT nameCategory FROM category WHERE _id = ${id};`, (err, results)=>{

            db.query(`UPDATE ${table} SET ? WHERE _id = ${id}`,[values], (err, rows) => {
                if (err){console.log(err)}
                else{
                    db.query(`UPDATE webs SET category = "${category}" WHERE category = "${results[0].nameCategory}"`)
                    console.log('update ' + results[0].nameCategory);
                }
            });
        })
    }else{
        db.query(`UPDATE ${table} SET ? WHERE _id = ${id}`,[values], (err, rows) => {
            if (err){console.log(err)}else{
                console.log('update success');
            }
        });
    }
}



const categories = (categorieIndex) => {

    db.query(`SELECT * FROM webs WHERE category = "${categorieIndex}"`, (err, results) => {
        if(err) throw err;
        db.query(`UPDATE category SET cant = ${results.length} WHERE nameCategory = "${categorieIndex}";`, (err2, results2) => {
            if(err2) throw err2;
        })
    })    
}


const numCateg = () => {
    db.query(`SELECT * FROM category;`, (error, results) => {
        let cant = results.length;
        for(let i = 0; i < cant; i ++){
            let categoria = results[i].nameCategory
            categories(categoria);
        }
    });
}



module.exports = {
    insert,
    deleteRegistro,
    updateRegistro,
    numCateg,
}