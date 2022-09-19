
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {title='', directed_by=''} = req.query
        const sql = `SELECT * FROM booking ${title ? `WHERE title LIKE '%${title}%'`: title && directed_by ? `WHERE title LIKE '%${title}%' AND directed_by LIKE '${directed_by}%'`:''} ORDER BY release_date DESC`
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from booking success",
            status: 200,
            data: results
          })
        })
      })
    },
    getId: (req, res) => { // get done
      return new Promise((resolve, reject) => {
          const {id_booking} = req.params;
          console.log(id_booking)
        const sql = `SELECT * FROM bookings WHERE id_booking =${id_booking}`;
        db.query(sql, (err, results) => {
          if (err) {
            console.log(err)
            reject({
              message: "Something wrong",
            });
          }
          resolve({
            message: "Get all from bookings success",
            status: 200,
            data: results
            // data:{results,
            //   ...req.body
            // }
            
          });
        });
      });
    },

    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {title, genre, release_date, directed_by, duration, cast, synopsis, image} = req.body

        db.query(`INSERT INTO movies(title, cover, release_date, director, description, casts, categories) VALUES('${title}', '${genre}','${release_date}','${directed_by}','${duration}','${cast}','${synopsis}','${image}')`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new booking success",
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
        const {id} = req.params
        db.query(`SELECT * FROM booking where id=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {title, genre, release_date, directed_by, duration, cast, synopsis, image} = previousData
      
          db.query(`UPDATE booking SET title='${title}', genre='${genre}', release_date='${release_date}', directed_by='${directed_by}', duration='${duration} synopsis='${synopsis}', cast='${cast}',  image='${image}'`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update booking success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`DELETE FROM booking where id=${id}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve.send({
            message: "delete booking success",
            status: 200,
            data: results
          })
        })
      })
    }
}