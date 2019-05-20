class Car {
    constructor(id, make, model, yearOfManufacture, color, price, licensePlate) {
        this.id    = id;
        this.make  = make;
        this.model = model;
        this.yearOfManufacture = yearOfManufacture; 
        this.color = color;
        this.price = price;
        this.licensePlate = licensePlate;
    }
}

const make             = ['Audi', 'BMW', 'Mercedes', 'Skoda', 'Volkswagen'];
const AudiModels       = ['A1','A3', 'A4', 'A5', 'A6', 'A7', 'Q7'];
const BMWModels        = ['3-series','5-series', '6-series', '7-series', 'X5'];
const MercedesModels   = ['C-series','E-series', 'S-series', 'GLE-series', 'GLS'];
const SkodaModels      = ['Rapid','Octavia', 'Superb', 'Kodiaq'];
const VolkswagenModels = ['Polo','Jetta', 'Passat', 'Caddy', 'Golf', 'Tiguan'];
const colors           = ['red', 'white', 'green', 'grey', 'black', 'yellow', 'blue'];

const numberOfCars     = 300;

let carsArray = fillArr();

fillMake(make);

callShowCars(carsArray)

document.querySelector('.show__button').addEventListener('click', () => {
    callShowCars(carsArray);
});

document.querySelector('.current__button').addEventListener('click', () => {
    let inputPrice  = parseInt(document.querySelector('.price').value);
    let currentYear = parseInt(document.querySelector('.year').value);

    if(inputPrice < 5000 || inputPrice > 35000) alert('Enter a valid year between 2000 and 2019');

    callShowCars(carsArray, undefined, undefined, undefined, currentYear, inputPrice)
});

(function () {
    let selecttYear = document.querySelector('.year');

    selecttYear.innerHTML = '<option></option>';

    for(let i = 2000; i < 2020; i++) {
        let option = document.createElement('option');
        
        option.innerText = i;
        selecttYear.appendChild(option);
    }
}());


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function fillArr() {

    let arr = [];
    let newCar;
    let randomMake;
    let randomId;
    let randomYear;
    let randomColor;
    let randomPrice;
    let randomPlate;
    
    try {
    
        for(let i = 0; i < numberOfCars; i++) {

        randomMake  = getRandomInt(0, make.length);
        randomId    = getRandomInt(1000, 10000);
        randomYear  = getRandomInt(2000, 2020);
        randomColor = getRandomInt(0, colors.length);
        randomPrice = getRandomInt(5000, 35000);
        randomPlate = getRandomInt(1000, 9999);
        
        switch(make[randomMake]) {
            case 'Audi':
                newCar = new Car(randomId, 'Audi', AudiModels[getRandomInt(0, AudiModels.length)], randomYear, colors[randomColor], randomPrice, 'АХ' + randomPlate);
                break;
            case 'BMW':
                newCar = new Car(randomId, 'BMW', BMWModels[getRandomInt(0, BMWModels.length)], randomYear, colors[randomColor], randomPrice, 'АХ' + randomPlate);
                break;
            case 'Mercedes':
                newCar = new Car(randomId, 'Mercedes', MercedesModels[getRandomInt(0, MercedesModels.length)], randomYear, colors[randomColor], randomPrice, 'АХ' + randomPlate);
                break;
            case 'Skoda':
                newCar = new Car(randomId, 'Skoda', SkodaModels[getRandomInt(0, SkodaModels.length)], randomYear, colors[randomColor], randomPrice, 'АХ' + randomPlate);
                break;
            case 'Volkswagen':
                newCar = new Car(randomId, 'Volkswagen', VolkswagenModels[getRandomInt(0, VolkswagenModels.length)], randomYear, colors[randomColor], randomPrice, 'АХ' + randomPlate);
                break;
            }

            arr.push(newCar);
        }

    } catch (exeption) {

        console.log(exeption);

    }
    return arr;
}

function callShowCars(arr, tempMake, tempModel, tempAge, tempYear, tempPrice) {

    let tempArr  = [];
    tempAge      = 2019 - tempAge;

    arr.forEach(elem => {
        const { make, model, yearOfManufacture, price } = elem;

        if (!tempMake && !tempModel && !tempAge && !tempYear && !tempPrice)
            
            tempArr.push(elem);
        
        else if (tempYear === yearOfManufacture && !tempPrice)
            
            tempArr.push(elem);

        else if (!tempYear && tempPrice <= price)

            tempArr.push(elem);

        else if (tempYear === yearOfManufacture && tempPrice <= price)

            tempArr.push(elem);
            
        else if (tempMake === make && !tempModel)
            
            tempArr.push(elem);

        else if (tempMake === make && tempModel === model && !tempAge)

            tempArr.push(elem);

        else if (tempMake === make && tempModel === model && tempAge >= yearOfManufacture)

            tempArr.push(elem);
    });

    showCars(tempArr);
}

function showCars(arr) {
    
    let resultTable = document.querySelector('.result__table');
    resultTable.innerHTML = '<tr> <th>Car id</th><th>Make</th><th>Model</th><th>Year Of Manufacture</th><th>Color</th><th>Price</th><th>License Plate</th></tr>';

    arr.forEach(elem => {

        const { id, make, model, yearOfManufacture, color, price, licensePlate } = elem;
        let car = document.createElement('tr');
        car.classList.add('car');

        car.innerHTML = `<td> ${id} </td> <td> ${make} </td> <td> ${model} </td> <td> ${yearOfManufacture} </td> <td> ${color} </td> <td> ${price} </td> <td> ${licensePlate} </td>`;
        resultTable.appendChild(car);
    });

}

function fillMake(arr) {
    let carsList = document.querySelector('.cars__list');

    arr.forEach(elem => {
        let option = document.createElement('option');

        option.innerText = elem;
        carsList.appendChild(option);

    });

    carsList.addEventListener('change', e => callFillModel(e.target.value));
}

function callFillModel(make) {

    callShowCars(carsArray, make);

    let modelList = document.querySelector('.model__list');
    let model;

    switch (make) {
        case 'Audi':
            fillModel(AudiModels, modelList);
            break;
        case 'BMW':
            fillModel(BMWModels, modelList);
            break;
        case 'Mercedes':
            fillModel(MercedesModels, modelList);
            break;
        case 'Skoda':
            fillModel(SkodaModels, modelList);
            break;
        case 'Volkswagen':
            fillModel(VolkswagenModels, modelList);
            break;   
    }

    modelList.addEventListener('change', e => {
        model = e.target.value;
        fillAge(make, model);
        callShowCars(carsArray, make, model);
    });
}

function fillModel(arr, modelList) {

    modelList.innerHTML = '<option>Choose the Model</option>';

    for(let i = 0; i < arr.length; i++) {
        let option = document.createElement('option');

        option.innerText = arr[i];
        modelList.appendChild(option);
    }
}

function fillAge(make, model) {
    let age = document.querySelector('.age');

    age.innerHTML = '<option></option>';

    for(let i = 0; i < 20; i++) {
        let option = document.createElement('option');
        
        option.innerText = i;
        age.appendChild(option);
    }

    age.addEventListener('change', e => callShowCars(carsArray, make, model, e.target.value));
}
