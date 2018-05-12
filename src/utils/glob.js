const glob = require('glob');

module.exports = (input,options={}) => {
  return new Promise((resolve,reject) =>{
    try{
      glob(input, options, function (err, files) {
        if(err){
          reject(err)
        }else{
          resolve(files);
        }
      })
    }catch(error){
      throw new Error(error);
    }
  })
}