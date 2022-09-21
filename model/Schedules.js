
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        // const {title='', directed_by=''} = req.query
        const sql = `SELECT  FROM schedule join movie && cinema on schedule.id_movie=movies.id_movie && cinema `
        // const sql = `SELECT products.product_name, description, categories.category_name FROM products join categories on products.category_id=categories.category_id ORDER BY price DESC LIMIT ${req.query.limit} OFFSET ${offset}`
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from schedules success",
            status: 200,
            data: results
          })
        })
      })
    },
    getId: (req, res) => { // get done
      return new Promise((resolve, reject) => {
          const {id_schedule} = req.params;
          console.log(id_schedule)
        const sql = `SELECT * FROM schedules WHERE id_schedule =${id_schedule}`;
        db.query(sql, (err, results) => {
          if (err) {
            console.log(err)
            reject({
              message: "Something wrong",
            });
          }
          resolve({
            message: "Get all from schedules success",
            status: 200,
            data: results,
          });
        });
      });
    },
    
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {time, price} = req.body

        db.query(`INSERT INTO schedules(time, price) VALUES('${time}', '${price}'`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "error"})
          }
          resolve({
            message: "add new schedules success",
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
        const {id_schedule} = req.params
        db.query(`SELECT * FROM schedules where id_schedule=${id_schedule}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {time, price} = previousData
      
          db.query(`UPDATE schedules SET time='${time}', price='${price}'`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "error"})
            }
            resolve({
              message: "update schedules success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id_schedule} = req.params
        db.query(`DELETE FROM schedules where id_schedule=${id_schedule}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve.send({
            message: "delete schedules success",
            status: 200,
            data: results
          })
        })
      })
    }
}