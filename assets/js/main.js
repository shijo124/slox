'use strict';

const CHART_DEFAULT = 120;
const CHART_WIDTH_ADD = 40;

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
// game save
//
function game_save(all_cnt,budo_cnt,cherry_cnt,bonus_kind,event_kind){

    let bonus_data = [];
    let temp_data = [];
    let end_data = [];
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

    chart_json = {
        "all_cnt":parseInt(all_cnt),
        "budo_cnt":parseInt(budo_cnt),
        "cherry_cnt":parseInt(cherry_cnt),
        "bonus_kind":bonus_kind,
    }

    if(event_kind === event_bonus){
        if ((typeof $.cookie('bonus_data') !== 'undefined') && ($.cookie('bonus_data') !== '')){
            bonus_data = JSON.parse($.cookie('bonus_data'));
        }
        bonus_data.unshift(chart_json);
        com_set_cookie('bonus_data', JSON.stringify(bonus_data));
    } else if (event_kind === event_temp){
        if ((typeof $.cookie('temp_data') !== 'undefined') && ($.cookie('temp_data') !== '')){
            temp_data = JSON.parse($.cookie('temp_data'));
        }
        com_set_cookie('temp_data', JSON.stringify(chart_json));
    } else if (event_kind === event_end){
        if ((typeof $.cookie('end_data') !== 'undefined') && ($.cookie('end_data') !== '')){
            end_data = JSON.parse($.cookie('end_data'));
        }
        com_set_cookie('end_data', JSON.stringify(chart_json));
    } else {
        return false;
    }

    return true;

}

//
// update bonus chart
//
function update_bonus_chart(myChart){

    if (typeof $.cookie('bonus_data') !== 'undefined'){
        if ($.cookie('bonus_data') !== ''){
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
            myChart.width = CHART_DEFAULT + (bonus_data.length * CHART_WIDTH_ADD);
            myChart.update();
        }
    }
}

//
// DEBUG
//
function debug(){
    console.log(JSON.parse($.cookie('bonus_data')));
    console.log(JSON.parse($.cookie('temp_data')));
    console.log(JSON.parse($.cookie('end_data')));
    console.log(JSON.parse($.cookie('bonus_rate')));
}

function cookie_del(){
    com_set_cookie('bonus_data', "", {path:'/', expires: -1});
    com_set_cookie('bonus_rate', "", {path:'/', expires: -1});
    com_set_cookie('temp_data', "", {path:'/', expires: -1});
    com_set_cookie('end_data', "", {path:'/', expires: -1});
    location.reload();
}
