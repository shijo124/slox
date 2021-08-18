'use strict';

const index_cnt = 9;

const tandoku_big = [
    402.1,
    397.2,
    383.3,
    372.4,
    352.3,
    334.4,
];

const tandoku_reg = [
    668.7,
    528.5,
    496.5,
    409.6,
    390.1,
    334.4,
];

const cherry_big = [
    1456.4,
    1394.4,
    1337.5,
    1260.3,
    1213.6,
    1170.3,
];

const cherry_reg = [
    1213.6,
    1170.3,
    1092.3,
    1024.0,
    963.8,
    862.3,
];

const big_rate = [
    287.4,
    282.5,
    273.1,
    264.3,
    252.1,
    240.9,
];

const reg_rate = [
    431.2,
    364.1,
    341.3,
    292.6,
    277.7,
    240.9,
];

const budo_rate = [
    6.35,
    6.29,
    6.25,
    6.23,
    6.18,
    6.07,
];

const cherry_rate = [
    36.03,
    35.95,
    34.69,
    33.51,
    33.40,
    33.23,
];

const total_rate = [
    172.5,
    159.1,
    151.7,
    138.9,
    132.1,
    120.5,
];

//
// guessing update
//
function guessing_update(){

    if (typeof $.cookie('bonus_rate') !== 'undefined'){
        let bonus_rate = JSON.parse(com_get_cookie('bonus_rate'));
        let guess_cnt = 0;

        if(bonus_rate.tandoku_big_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=tandoku_big.length;i++){
                if(tandoku_big[i] <= bonus_rate.tandoku_big_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_tb'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.tandoku_reg_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=tandoku_reg.length;i++){
                if(tandoku_reg[i] <= bonus_rate.tandoku_reg_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_tr'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.cherry_big_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=cherry_big.length;i++){
                if(cherry_big[i] <= bonus_rate.cherry_big_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_cb'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.cherry_reg_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=cherry_reg.length;i++){
                if(cherry_reg[i] <= bonus_rate.cherry_reg_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_cr'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.total_big_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=big_rate.length;i++){
                if(big_rate[i] <= bonus_rate.total_big_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_b'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.total_reg_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=reg_rate.length;i++){
                if(reg_rate[i] <= bonus_rate.total_reg_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_r'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.total_budo_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=budo_rate.length;i++){
                if(budo_rate[i] <= bonus_rate.total_budo_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_m'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.total_cherry_rate !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=cherry_rate.length;i++){
                if(cherry_rate[i] <= bonus_rate.total_cherry_rate){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_c'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        if(bonus_rate.total_calc !== 0){
            let loop_cnt = 6;
            for(let i=1;i<=total_rate.length;i++){
                if(total_rate[i] <= bonus_rate.total_calc){
                    loop_cnt = i
                    break;
                }
            }
            $('.js_to'+loop_cnt).addClass('bg-danger');
            guess_cnt += loop_cnt;
        }

        $('.js_now_guess').html(Math.floor(guess_cnt/index_cnt));

    }
}

