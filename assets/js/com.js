'use strict';

// const com_domain = 'shijo124.github.io';
const com_domain = '192.168.56.108';

//
// cookie set
//
function com_set_cookie(keyword,val){
    $.cookie(
        keyword,
        val,
        {
            expires:7,
            secure:true,
            domain:com_domain,
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

