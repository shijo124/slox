'use strict';

const COM_DOMAIN = 'shijo124.github.io';
// const COM_DOMAIN = '192.168.56.108';

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

//
// bonus_rate
//
function bonus_rate_update(){
    if (typeof $.cookie('bonus_data') !== 'undefined'){
        let bonus_data = JSON.parse(com_get_cookie('bonus_data'));
        let bonus_rate = {
            total_cnt:0,
            total_calc:0,
            total_big:0,
            total_big_rate:0.0,
            total_reg:0,
            total_reg_rate:0.0,
            total_budo:0,
            total_budo_rate:0.0,
            total_cherry:0,
            total_cherry_rate:0.0,
            tandoku_big:0,
            tandoku_big_rate:0.0,
            tandoku_reg:0,
            tandoku_reg_rate:0.0,
            cherry_big:0,
            cherry_big_rate:0.0,
            cherry_reg:0,
            cherry_reg_rate:0.0,
        }

        for(let i=0;i<bonus_data.length;i++){
            bonus_rate.total_cnt += parseInt(bonus_data[i]['all_cnt']);
            bonus_rate.total_budo += parseInt(bonus_data[i]['budo_cnt']);
            bonus_rate.total_cherry += parseInt(bonus_data[i]['cherry_cnt']);
            if(bonus_data[i]['bonus_kind'] === TANDOKU_BIG){
                bonus_rate.total_big += 1;
                bonus_rate.tandoku_big += 1;
            } else if(bonus_data[i]['bonus_kind'] === TANDOKU_REG) {
                bonus_rate.total_reg += 1;
                bonus_rate.tandoku_reg += 1;
            } else if(bonus_data[i]['bonus_kind'] === CHERRY_BIG) {
                bonus_rate.total_big += 1;
                bonus_rate.cherry_big += 1;
            } else if(bonus_data[i]['bonus_kind'] === CHERRY_REG) {
                bonus_rate.total_reg += 1;
                bonus_rate.cherry_reg += 1;
            } else {
                return false;
            }
        }

        // TOTAL CALC
        if((bonus_rate.total_big + bonus_rate.total_reg) > 0){
            bonus_rate.total_calc = Math.ceil(bonus_rate.total_cnt / (bonus_rate.total_big + bonus_rate.total_reg));
        } else {
            bonus_rate.total_calc = 0;
        }
        // BIG
        if(bonus_rate.total_big > 0){
            bonus_rate.total_big_rate = Math.ceil(bonus_rate.total_cnt / bonus_rate.total_big);
        } else {
            bonus_rate.total_big_rate = 0;
        }
        // REG
        if(bonus_rate.total_reg > 0){
            bonus_rate.total_reg_rate = Math.ceil(bonus_rate.total_cnt / bonus_rate.total_reg);
        } else {
            bonus_rate.total_reg_rate = 0;
        }
        // BUDO 小数点第2位
        if(bonus_rate.total_budo > 0){
            bonus_rate.total_budo_rate = Math.ceil((bonus_rate.total_cnt / bonus_rate.total_budo) * 100) / 100;
        } else {
            bonus_rate.total_budo_rate = 0;
        }
        // CHERRY 小数点第2位
        if(bonus_rate.total_cherry > 0){
            bonus_rate.total_cherry_rate = Math.ceil((bonus_rate.total_cnt / bonus_rate.total_cherry) * 100) / 100;
        } else {
            bonus_rate.total_cherry_rate = 0;
        }
        // TANDOKU BIG
        if(bonus_rate.tandoku_big > 0){
            bonus_rate.tandoku_big_rate = Math.ceil(bonus_rate.total_cnt / bonus_rate.tandoku_big);
        } else {
            bonus_rate.tandoku_big_rate = 0;
        }
        // TANDOKU REG
        if(bonus_rate.tandoku_reg > 0){
            bonus_rate.tandoku_reg_rate = Math.ceil(bonus_rate.total_cnt / bonus_rate.tandoku_reg);
        } else {
            bonus_rate.tandoku_reg_rate = 0;
        }
        // CHERRY BIG
        if(bonus_rate.cherry_big > 0){
            bonus_rate.cherry_big_rate = Math.ceil(bonus_rate.total_cnt / bonus_rate.cherry_big);
        } else {
            bonus_rate.cherry_big_rate = 0;
        }
        // CHERRY REG
        if(bonus_rate.cherry_reg > 0){
            bonus_rate.cherry_reg_rate = Math.ceil(bonus_rate.total_cnt / bonus_rate.cherry_reg);
        } else {
            bonus_rate.cherry_reg_rate = 0;
        }

        if(bonus_rate.total_cnt > 0){
            $('.js_total_cnt').text(String(bonus_rate.total_cnt) + " 回");
        } else {
            $('.js_total_cnt').text("0 回");
        }

        if(bonus_rate.total_calc > 0){
            $('.js_total_calc').text(String("1/" + String(bonus_rate.total_calc)));
        } else {
            $('.js_total_cnt').text("-/-");
        }

        if(bonus_rate.total_big > 0){
            $('.js_total_big').text(String(bonus_rate.total_big) + " 回 " + "(1/" + String(bonus_rate.total_big_rate) + ")");
        } else {
            $('.js_total_big').text(String(bonus_rate.total_big) + " 回 (-/-)");
        }

        if(bonus_rate.total_reg_rate > 0){
            $('.js_total_reg').text(String(bonus_rate.total_reg) + " 回 " + "(1/" + String(bonus_rate.total_reg_rate) + ")");
        } else {
            $('.js_total_reg_rate').html("-/-");
        }
        $('.js_total_budo').html(String(bonus_rate.total_budo) + " 回");
        if(bonus_rate.total_budo_rate > 0){
            $('.js_total_budo_rate').html("(1/" + String(bonus_rate.total_budo_rate) + ")");
        } else {
            $('.js_total_budo_rate').html("(-/-)");
        }
        $('.js_total_cherry').html(String(bonus_rate.total_cherry) + " 回");
        if(bonus_rate.total_cherry_rate > 0){
            $('.js_total_cherry_rate').html("(1/" + String(bonus_rate.total_cherry_rate) + ")");
        } else {
            $('.js_total_cherry_rate').html("(-/-)");
        }
        $('.js_tandoku_big').html(String(bonus_rate.tandoku_big) + " 回");
        if(bonus_rate.tandoku_big_rate > 0){
            $('.js_tandoku_big_rate').html("(1/" + String(bonus_rate.tandoku_big_rate) + ")");
        } else {
            $('.js_tandoku_big_rate').html("(-/-)");
        }
        $('.js_tandoku_reg').html(String(bonus_rate.tandoku_reg) + " 回");
        if(bonus_rate.tandoku_reg_rate > 0){
            $('.js_tandoku_reg_rate').html("(1/" + String(bonus_rate.tandoku_reg_rate) + ")");
        } else {
            $('.js_tandoku_reg_rate').html("(-/-)");
        }
        $('.js_cherry_big').html(String(bonus_rate.cherry_big) + " 回");
        if(bonus_rate.cherry_big_rate > 0){
            $('.js_cherry_big_rate').html("(1/" + String(bonus_rate.cherry_big_rate) + ")");
        } else {
            $('.js_cherry_big_rate').html("(-/-)");
        }
        $('.js_cherry_reg').html(String(bonus_rate.cherry_reg) + " 回");
        if(bonus_rate.cherry_reg_rate > 0){
            $('.js_cherry_reg_rate').html("(1/" + String(bonus_rate.cherry_reg_rate) + ")");
        } else {
            $('.js_cherry_reg_rate').html("(-/-)");
        }

        com_set_cookie('bonus_rate', JSON.stringify(bonus_rate));
    }
}

