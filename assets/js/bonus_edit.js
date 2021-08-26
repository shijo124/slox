'use strict';

const TANDOKU_BIG = 'tan_big';
const TANDOKU_REG = 'tan_reg';
const CHERRY_BIG = 'che_big';
const CHERRY_REG = 'che_reg';

//
// bonus data show
//
function bonus_data_show(){

    if (typeof $.cookie('bonus_data') !== 'undefined'){
        let bonus_data = JSON.parse(com_get_cookie('bonus_data'));
        let html_bonus_data = '';

        html_bonus_data = `
            <div class="row mt-3">
                <div class="col p-0">回前</div>
                <div class="col p-0">スタート</div>
                <div class="col p-0">累計<br>ぶどう</div>
                <div class="col p-0">累計<br>チェリー</div>
                <div class="col p-0">ボーナス</div>
            </div>`;

        for(let i=0;i<bonus_data.length;i++){

            let bonus_kind = '';
            if(bonus_data[i].bonus_kind === TANDOKU_BIG){
                bonus_kind = '単BIG';
            } else if(bonus_data[i].bonus_kind === TANDOKU_REG){
                bonus_kind = '単REG';
            } else if(bonus_data[i].bonus_kind === CHERRY_BIG){
                bonus_kind = 'ﾁｪBIG';
            } else if(bonus_data[i].bonus_kind === CHERRY_REG){
                bonus_kind = 'ﾁｪREG';
            } else {
                bonus_kind = '不明';
            }

            html_bonus_data += `
                <div class="row mt-3 js_bonus_edit" data-edit-no="${i}">
                    <div class="col p-0">${i+1}回前</div>
                    <div class="col p-0">${bonus_data[i].all_cnt}</div>
                    <div class="col p-0">${bonus_data[i].budo_cnt}</div>
                    <div class="col p-0">${bonus_data[i].cherry_cnt}</div>
                    <div class="col p-0">${bonus_kind}</div>
                </div>`;
        }
        $('.js_bonus_edit_area').html(html_bonus_data);
    }
}

//
// bonus modal
//
function bonus_modal(bonus_no){
    if (typeof $.cookie('bonus_data') !== 'undefined'){
        let bonus_data = JSON.parse(com_get_cookie('bonus_data'));

        $('input[name="all_game_cnt"]').val(bonus_data[bonus_no].all_cnt);
        $('input[name="all_budo_cnt"]').val(bonus_data[bonus_no].budo_cnt);
        $('input[name="all_cherry_cnt"]').val(bonus_data[bonus_no].cherry_cnt);
        $('input[name="update_no"]').val(bonus_no);
        bonus_edit_modal.show();
    }
    else{
        return false;
    }
}

//
// bonus update
//
function bonus_update(all_cnt,budo_cnt,cherry_cnt,bonus_kind,update_no){
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
        chart_json = {
            "all_cnt":parseInt(all_cnt),
            "budo_cnt":parseInt(budo_cnt),
            "cherry_cnt":parseInt(cherry_cnt),
            "bonus_kind":bonus_kind,
        }
        bonus_data.splice(update_no, 1, chart_json);
        com_set_cookie('bonus_data', JSON.stringify(bonus_data));
    } else {
        return false;
    }

    return true;

}