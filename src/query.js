
const api_url_name = "https://restcountries.eu/rest/v2/all?fields=name";
const api_url_data = "https://restcountries.eu/rest/v2/all?fields=name;region;population;currencies;languages";
var itemCount = 0;

async function showCardItem(countryName, regionName, population, languagesName, currenciesName) {
    //Receives data from request

    /* Testing code
    var countryName = "Country Name";
    var regionName = "Region Name";
    var currenciesName = "Currencies Name";
    var languagesName = "Languages Name";
    var population = "A lot";
    */

    // Open cardHolder div to add elements
    var cardHolder = document.getElementById("cardHolder");

    //  Crate dummy elements to fill and add parameters to them
    //      Assign the corresponding ID's and class to the elements
    var cardItem = document.createElement("table");
        cardItem.setAttribute('id', "hiddenCardItem");
        cardItem.setAttribute('class', "cardItem");
    var cardItemBody = document.createElement("tbody");
    var cardItemNameRow = document.createElement("tr");
    var cardItemRegionRow = document.createElement("tr");
    var cardItemPopRow = document.createElement("tr");
    var cardItemLangRow = document.createElement("tr");
    var cardItemCurrRow = document.createElement("tr");
    var cardNameHead = document.createElement("th");
        cardNameHead.setAttribute('class', "theader");
    var cardNameItem = document.createElement("th");
        cardNameItem.setAttribute('class', "tcontent");
    var cardRegionHead = document.createElement("th");
        cardRegionHead.setAttribute('class', "theader");
    var cardRegionItem = document.createElement("th");
        cardRegionItem.setAttribute('class', "tcontent");
    var cardPopHead = document.createElement("th");
        cardPopHead.setAttribute('class', "theader");
    var cardPopItem = document.createElement("th");
        cardPopItem.setAttribute('class', "tcontent");
    var cardLangHead = document.createElement("th");
        cardLangHead.setAttribute('class', "theader");
    var cardLangItem = document.createElement("th");
        cardLangItem.setAttribute('class', "tcontent");
    var cardCurrHead = document.createElement("th");
        cardCurrHead.setAttribute('class', "theader");
    var cardCurrItem = document.createElement("th");
        cardCurrItem.setAttribute('class', "tcontent");

    //Assembles the 'cardItem' table with corresponding format
    cardItem.appendChild(cardItemBody);
    cardItemBody.appendChild(cardItemNameRow);
    cardItemNameRow.appendChild(cardNameHead);
    cardItemNameRow.appendChild(cardNameItem);
    cardItemBody.appendChild(cardItemRegionRow);
    cardItemRegionRow.appendChild(cardRegionHead);
    cardItemRegionRow.appendChild(cardRegionItem);
    cardItemBody.appendChild(cardItemPopRow);
    cardItemPopRow.appendChild(cardPopHead);
    cardItemPopRow.appendChild(cardPopItem);
    cardItemBody.appendChild(cardItemLangRow);
    cardItemLangRow.appendChild(cardLangHead);
    cardItemLangRow.appendChild(cardLangItem);
    cardItemBody.appendChild(cardItemCurrRow);
    cardItemCurrRow.appendChild(cardCurrHead);
    cardItemCurrRow.appendChild(cardCurrItem);

    // Adds the values and fills the cardItem
    cardNameHead.appendChild(document.createTextNode("Name"));
    cardNameItem.appendChild(document.createTextNode(countryName));
    cardRegionHead.appendChild(document.createTextNode("Region"));
    cardRegionItem.appendChild(document.createTextNode(regionName));
    cardPopHead.appendChild(document.createTextNode("Population"));
    cardPopItem.appendChild(document.createTextNode(population));
    cardLangHead.appendChild(document.createTextNode("Languages Names"));
    cardLangItem.appendChild(document.createTextNode(languagesName));
    cardCurrHead.appendChild(document.createTextNode("Currencies Name"));
    cardCurrItem.appendChild(document.createTextNode(currenciesName));


    //Adds the new table to the cardContainer element
    cardHolder.appendChild(cardItem);
}

async function removeCardItems() {
    var cardHolder = document.getElementById("cardHolder");
    var cardItem = document.getElementById("hiddenCardItem")
    document.getElementById("cardHolder").innerHTML = "";
}

async function getCountryData() {
    country_name = [];
    country_reg = [];
    country_pop = [];
    country_lang = [];
    country_curr = [];

    for (i = 0; i < data.length; i++) {
        country_name = data[i].name;
        country_reg = data[i].region;
        country_pop = data[i].population;
        for (j = 0; j < data[i].languages[j].length; j++) {
            country_lang[j] = data[i].languages[j].name;
        }
        for (j = 0; j < data[i].currencies[j].length; j++) {
            country_curr[j] = data[i].currencies[j].name;
        }
    }
}

async function getData(api_url) {
    const response = await fetch(api_url);
    const data = await response.json();
    var countryData = [];
    var countryDataLocal = [];
    countryLang = "";
    countryCurr = "";

    for (j = 0; j < (data.length) / 5; j++) {
        for (i = 0; i < data[j].languages.length; i++) {
            countryLang = countryLang.concat(data[j].languages[i].name, " ");
        }
        for (i = 0; i < data[j].currencies.length; i++) {
            countryCurr = countryCurr.concat(data[j].currencies[i].name, " ");
        }
        countryDataLocal[0] = data[j].name;
        countryDataLocal[1] = data[j].region;
        countryDataLocal[2] = data[j].population;
        countryDataLocal[3] = countryLang;
        countryDataLocal[4] = countryCurr;
        countryData[j] = countryDataLocal;
    }
    return countryData;
}

async function getAllData() {                       // Gets all data from all countries.
    //  Test feature
    //const response = await fetch(api_url_name);
    const response = await fetch(api_url_data);     // Retrieves the query to use
    const data = await response.json();             // Handles to JSON

    console.log(`COUNTRIES INFORMATION`)            // Flags
    console.log("-----------");                     //
    console.log("-----------");                     //

    for (j = 0; j < data.length; j++) {              //Retrieves the information on each country
        console.log(data[j].name);
        console.log(data[j].region);
        console.log(data[j].population);

        var languagesName = [];
        for (i = 0; i < data[j].languages.length; i++) {
            languagesName[i] = data[j].languages[i].name;
            console.log(languagesName[i]);
        }

        var currenciesName = [];
        for (i = 0; i < data[j].currencies.length; i++) {
            currenciesName[i] = data[j].currencies[i].name;
            console.log(currenciesName[i]);
        }
        console.log("-----------");
    }
    console.log("-----------");
    console.log("-----------");

}

async function showDialogAlert(){
    var securityAlertItem = document.getElementById("securityAlert");
    if(typeof securityAlertItem.showModal === "function") {
        securityAlertItem.showModal();
    } else {
        alert("Your browser does not support dialog element!");
    }

}
async function closeAlert(){
    document.getElementById("securityAlert").close();
}

async function getCountryByName() {                              /* Creates a query to retreive name */

    var inputList = document.getElementById("simpleSearchBar");                 // Call the searchbar
    var check = inputList.value;                                                // Call the value of the searchbar
    if (check.length <= 2) { 
        // Security thing
        showDialogAlert();
        console.log("SecurityAlert");
    } else if (check.length > 2){
        try {
            removeCardItems();
        } catch (e) {
            logMyErrors(e);
        }

        var name_url = "https://restcountries.eu/rest/v2/name/";
        var countryQuery = document.getElementById("simpleSearchBar").value;
        var new_name_url = name_url.concat(countryQuery);      //Retrieves the text as it gets clicked
        var countryDataLocal = [];
        var countryData = await getData(new_name_url);
        //Get elements in the response and print them
        for (i = 0; i < countryData.length; i++) {
            countryDataLocal = countryData[i];
            showCardItem(countryDataLocal[0], countryDataLocal[1], countryDataLocal[2], countryDataLocal[3], countryDataLocal[4]);
        }
    }
}

async function searchCountryByName() {                                          /* Creates a query to retreive name */
    var inputList = document.getElementById("simpleSearchBar");                 // Call the searchbar
    var check = inputList.value;                                                // Call the value of the searchbar
    if (check.length > 2) {                                                     // Check the length of the word,
        //check = document.getElementById("simpleSearchBar").value;
        // https://restcountries.eu/rest/v2/name/can?fields=name
        
        var name_url = "https://restcountries.eu/rest/v2/name/";                //Assembles the query
        var countryQuery = document.getElementById("simpleSearchBar").value;    // ...
        var new_name_url = name_url.concat(countryQuery, "?fields=name");       // Assembles the value entered
        
        try {
            const response = await fetch(new_name_url);                         // Fetches the query made by the user
            const data = await response.json();                                 //..

            // Clears existing list and shows new datalist of countries 
            document.getElementById("countriesName").remove();                  //Clears the existing list of countries

            var dataListItem = document.createElement("datalist");              //Creates the list element countries
            dataListItem.setAttribute('id', "countriesName");                   //..
            document.getElementById("simpleSearchBar").append(dataListItem);    //..

            for (var let in data) {                                             // Fills the list element with matching
                console.log(countryQuery)                                       // Countries
                var optionElement = document.createElement("option");
                optionElement.setAttribute("id", "optionItem");
                optionElement.value = data[let].name;
                countriesName.appendChild(optionElement);
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    else {                                                                      //If query length is less than 2,
        var optionElement = document.createElement("option");
        document.getElementById("countriesName").innerHTML = "";

    }
}  