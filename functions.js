const sqlite3 = require('sqlite3').verbose();
const express= require ('express')
const app= express; 
let db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the mydatabase database.\n');
});
const insert = () => {

    db.run('INSERT INTO Films(name, genre) VALUES (?, ?)', ['Movie', 'Comedy'], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}
const update = () => {
    db.run('UPDATE Films name = ? WHERE id = ?', ['New Movie', 7], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes} `);

    });

}

const remove = () => {
    db.run(`DELETE FROM Films WHERE name = ?`, 'Deadpool', function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });
}

const list = () => {
    db.all('SELECT * FROM Films', [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.ID + "\t" + row.Name + "\t" + row.Genre);
        });
    });

}

const close = () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('\nClose the database connection.');
    });
}
list ();
// console.log(process.argv)