const {format} = require('timeago.js');


const helpers = {
    
};

helpers.timeago=(timestamp)=>{
    return format(timestamp);
};

helpers.isEqual=(arg1, arg2, options)=>{
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};


module.exports=helpers;