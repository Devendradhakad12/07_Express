class ExapressError extends Error {
    constructor(status,msg){
        super();
        this.status = status;
        this.message = msg;
    }
}
module.exports =  ExapressError;

// * async function error hendling
function asyncWrap(func) {
    return function(req,res,next) {
        func(req,res,next).catch((err)=>next(new ExapressError(400, err.message)))
    }
}
module.exports = asyncWrap;