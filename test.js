'use strict';

function js_calc(){
    var calc_1 = parseInt(document.getElementById('js_calc_1').value);
    let calc_enz = parseInt(document.getElementById('js_calc_enz').value);
    let calc_2 = parseInt(document.getElementById('js_calc_2').value);
    let equ = 0;

    switch(calc_enz){
        case 1:
            equ = calc_1 + calc_2;
            break;
        case 2:
            equ = calc_1 - calc_2;
            break;
        case 3:
            equ = calc_1 * calc_2;
            break;
        case 4:
            equ = calc_1 / calc_2;
            break;
        default:
            equ = 0;
            break;
    }

    document.getElementById('js_calc_ans').textContent = "答え"+equ;
}

const e = React.createElement;

class CalcAnswer extends React.Component {
    render() {
      return e(
        'h1',
        null,
        '答え 10'
        );
    }
  }
  
  const domContainer = document.querySelector('#react_calc');
  ReactDOM.render(e(CalcAnswer), domContainer);
