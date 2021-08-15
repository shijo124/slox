'use strict';

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