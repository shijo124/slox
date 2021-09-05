//
// start save
//
function start_save(all_cnt,big_cnt,reg_cnt){

    let start_data = [];

    if (isNaN(all_cnt) && isNaN(big_cnt) && isNaN(reg_cnt)){
        // start_dataが登録されていた場合、削除
        if ((typeof $.cookie('start_data') !== 'undefined') && ($.cookie('start_data') !== '')){
            com_set_cookie('start_data', "", {path:'/', expires: -1});
        }
        return true;
    }

    if((all_cnt < 1) || (validation_check(all_cnt,"dec") === false)){
        alert('総回転数には1以上の半角の数字をいれてください');
        return false;
    }

    if((big_cnt < 1) || (validation_check(big_cnt,"dec") === false)){
        alert('BIGには0以上の半角の数字をいれてください');
        return false;
    }

    if((reg_cnt < 1) || (validation_check(reg_cnt,"dec") === false)){
        alert('REGには0以上の半角の数字をいれてください');
        return false;
    }

    start_data = {
        "all_cnt":parseInt(all_cnt),
        "big_cnt":parseInt(big_cnt),
        "reg_cnt":parseInt(reg_cnt),
    }
    console.log(start_data);

    // if ((typeof $.cookie('start_data') !== 'undefined') && ($.cookie('start_data') !== '')){
    //     start_data = JSON.parse($.cookie('start_data'));
    // }
    // start_data.push(chart_json);
    com_set_cookie('start_data', JSON.stringify(start_data));

    return true;

}

