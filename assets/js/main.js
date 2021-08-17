'use strict';

const TANDOKU_BIG = 'tan_big';
const TANDOKU_REG = 'tan_reg';
const CHERRY_BIG = 'che_big';
const CHERRY_REG = 'che_reg';

const bonus_chart_color = {
    "tan_big":"rgba(255,0,0,0.5)",
    "tan_reg":"rgba(0,255,0,0.5)",
    "che_big":"rgba(255,255,0,0.5)",
    "che_reg":"rgba(0,0,255,0.5)",
}

//
// bonus save
//
function bonus_save(all_cnt,budo_cnt,cherry_cnt,bonus_kind){

    let bonus_data = [];
    let chart_json = {};


    if((all_cnt === "") || (validation_check(all_cnt,"dec") === false)){
        alert('当選ゲーム数には半角の数字をいれてください');
        return false;
    }
    if(!isNaN(budo_cnt)){
        if(validation_check(budo_cnt,"dec") === false){
            alert('累計ブドウには半角の数字をいれてください');
            return false;
        }
    } else {
        budo_cnt = 0
    }
    if(!isNaN(cherry_cnt)){
        if(validation_check(cherry_cnt,"dec") === false){
            alert('累計チェリーには半角の数字をいれてください');
            return false;
        }
    } else {
        cherry_cnt = 0
    }


    if (typeof $.cookie('bonus_data') !== 'undefined'){
        bonus_data = JSON.parse($.cookie('bonus_data'));
    }
    chart_json = {
        "all_cnt":parseInt(all_cnt),
        "budo_cnt":parseInt(budo_cnt),
        "cherry_cnt":parseInt(cherry_cnt),
        "bonus_kind":bonus_kind,
    }
    bonus_data.unshift(chart_json);
    com_set_cookie('bonus_data', JSON.stringify(bonus_data));


    return true;

}

//
// update bonus chart
//
function update_bonus_chart(ctx,myChart){

    if (typeof $.cookie('bonus_data') !== 'undefined'){
        let bonus_data = JSON.parse(com_get_cookie('bonus_data'));

        let up_label = bonus_data.map(bd => bd.all_cnt);
        let up_data = bonus_data.map(bd => bd.all_cnt);
        let up_bonus_kind = bonus_data.map(bd => bd.bonus_kind);

        // up_dataを100単位で整形(1000以上：1000、100以下：100、以外：当選回数/100 余りあり=切り上げ、余りなし=そのまま)
        for(let i=0;i<up_data.length;i++){
            if(parseInt(up_data[i]) >= 1000){
                up_data[i] = 1000;
            } else if(parseInt(up_data[i]) <= 100){
                up_data[i] = 100;
            } else {
                if((parseInt(up_data[i]) % 100) !== 0){
                    up_data[i] = (Math.trunc(parseInt(up_data[i]) / 100) + 1) * 100;
                }
            }
        }

        // ボーナス種類でグラフの色を変更
        for(let i=0;i<up_bonus_kind.length;i++){
            up_bonus_kind[i] = bonus_chart_color[up_bonus_kind[i]]
        }

        let update_chart_data = {
            data: {
                labels: up_label,
                datasets: [
                    {
                        data: up_data,
                        backgroundColor: up_bonus_kind,
                    }
                ]
            },
        }
        myChart.data = update_chart_data.data;
        myChart.update();

    }
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

        $('.js_total_cnt').html(String(bonus_rate.total_cnt) + " 回");
        $('.js_total_calc').html("(1/" + String(bonus_rate.total_calc) + ")");
        $('.js_total_big').html(String(bonus_rate.total_big) + " 回");
        if(bonus_rate.total_big_rate > 0){
            $('.js_total_big_rate').html("(1/" + String(bonus_rate.total_big_rate) + ")");
        } else {
            $('.js_total_big_rate').html("(-/-)");
        }
        $('.js_total_reg').html(String(bonus_rate.total_reg) + " 回");
        if(bonus_rate.total_reg_rate > 0){
            $('.js_total_reg_rate').html("(1/" + String(bonus_rate.total_reg_rate) + ")");
        } else {
            $('.js_total_reg_rate').html("(-/-)");
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

    }
}

//
// DEBUG
//
function debug(){
    bonus_rate_update();
    let bonus_obj = JSON.parse($.cookie('bonus_data'));
    alert(JSON.stringify(bonus_obj));
}

function cookie_del(){
    $.removeCookie('bonus_data', {path:'/'});
}
