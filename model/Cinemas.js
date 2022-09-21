
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        // const {title='', directed_by=''} = req.query
        const sql = `SELECT * FROM cinemas`
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from cinemas success",
            status: 200,
            data: results
          })
        })
      })
    },
    getId: (req, res) => { // get done
      return new Promise((resolve, reject) => {
          const {id_cinema} = req.params;
          console.log(id_cinema)
        const sql = `SELECT * FROM cinemas WHERE id_cinema =${id_cinema}`;
        db.query(sql, (err, results) => {
          if (err) {
            console.log(err)
            reject({
              message: "Something wrong",
            });
          }
          resolve({
            message: "Get all from cinemas success",
            status: 200,
            data: results,
          });
        });
      });
    },
    
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {name_cinema, address_cinema, image_cinema} = req.body

        db.query(`INSERT INTO cinemas(name_cinema, addres_cinema, image_cinema) VALUES('${name_cinema}', '${address_cinema}','${image_cinema}')`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "error"})
          }
          resolve({
            message: "add new cinemas success",
            status: 200,
            data: {
              id: results.insertId,
              ...req.body,
            }
          })
        })
      })
    },
    update: (req, res) => {
      return new Promise((resolve, reject)=> {
        const {id_cinema} = req.params
        db.query(`SELECT * FROM cinemas where id_cinema=${id_cinema}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {name_cinema, address_cinema, image_cinema} = previousData
      
          db.query(`UPDATE cinemas SET name_cinema='${name_cinema}', address_cinema='${address_cinema}',image_cinema='${image_cinema}'`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "error"})
            }
            resolve({
              message: "update cinemas success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id_cinema} = req.params
        db.query(`DELETE FROM cinemas where id_cinema=${id_cinema}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve.send({
            message: "delete cinemas success",
            status: 200,
            data: results
          })
        })
      })
    }
}