// required url
const API_URL = 'https://api.nationalize.io/?name=';

//creating main div

const maindiv=document.createElement('div');
maindiv.class="container";
document.body.append(maindiv);
const container=document.querySelector('.container');

//creating heading

const head=document.createElement('h1');
head.innerHTML='Nationality Search';
maindiv.append(head);

//creating search bar

// Create a label element
const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'name');
nameLabel.textContent = 'Enter Name: ';
nameLabel.setAttribute('id', 'name1');
maindiv.append(nameLabel);


// Create an input element
const NameInput = document.createElement('input');
NameInput.setAttribute('type', 'text');
NameInput.setAttribute('id', 'name');
NameInput.setAttribute('placeholder', 'Name');
maindiv.append(NameInput);
const nameInput=document.querySelector('#name');

//creating button element
const butt=document.createElement('button');
butt.id='search';
butt.innerHTML="Search";
maindiv.append(butt);
const searchbutton=document.querySelector('#search');

// Creating a br element
const lineBreak = document.createElement('br');
maindiv.append(lineBreak);


//creating result div
const resultHt=document.createElement('div');
resultHt.id="result";
maindiv.append(resultHt);
const resultdiv=document.querySelector('#result');

//async function,await, try, catch

searchbutton.addEventListener("click", async ()=>{
    const name=nameInput.value.trim();
    if(name==''){
        resultdiv.innerHTML="Please Enter a name";
        return;
    }
    try{
        const response = await fetch(API_URL + name);
    
    const data = await response.json();
  // console.log(data);
    
 const probability1=data.country[0].probability;
 const probability2=data.country[1].probability;
 const topCountries1=data.country[0].country_id;
 const topCountries2=data.country[1].country_id;
 const topCountries = data.country.splice(0, 2).map(country => `${country.country_id} (${(country.probability * 100).toFixed(2)}%)`).join(', ');
 const fullName = data.name;
    const markName = fullName.replace(name, `<mark style="background-color: skyblue;">${name}</mark>`);
    
resultdiv.innerHTML = `The nationality of ${markName} is most likely from ${topCountries}. <br> <br>The probability value of ${topCountries1} is ${probability1} and ${topCountries2} is ${probability2}` ;
   
  } catch (error) {
    console.error(error);
    resultdiv.textContent = 'An error occurred. Please try again later.';
  }
});
