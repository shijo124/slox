'use strict';

// const COM_DOMAIN = 'shijo124.github.io';
const COM_DOMAIN = '192.168.56.108';

//
// cookie set
// return nothing
//
function com_set_cookie(keyword,val){
    $.cookie(
        keyword,
        val,
        {
            expires:7,
            secure:true,
            domain:COM_DOMAIN,
            path:'/',
        }
    );
}

function com_get_cookie(keyword){
    return $.cookie(keyword);
}

//
// validation
// return bool
//
function validation_check(val, mode){
    if (mode === 'dec'){
        // decimal
        let reg = new RegExp(/^[0-9]*$/);
        return reg.test(val);
    }

    return false;
}

