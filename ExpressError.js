class ExpressError extends Error{
   constructor(err,message){
      super();
      this.error=erro;
      this.message=message;
   }
}
module.exports = ExpressError;