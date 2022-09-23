const charts = document.querySelectorAll('.day-chart');
const dayValue = document.querySelectorAll('.day-chart-value');
const date = new Date;
let day = date.getDay();

day = day != 0 ? day - 1 : 6;

function fillData(data) {
    console.log(data);
    let min = max = data[0].amount;

    dayValue.forEach((element, index) => {
        element.innerHTML = "$" + data[index].amount;
        max = data[index].amount > max ? data[index].amount : max;
        min = data[index].amount < min ? data[index].amount : min;
    })

    charts.forEach((element, index) => {
        let height = ((data[index].amount - min)/(max - min))*7 + 1;
        element.style.height = height + "rem";
        if(index == day) {
            element.classList.add('current-day');
        }
    })
}

let jsonData = null
fetch('./data.json')
  .then(response => response.json())
  .then(data => fillData(data))
  .catch(error => console.log(error));

