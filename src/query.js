
const api_url_name = "https://restcountries.eu/rest/v2/all?fields=name";
const api_url_data = "https://restcountries.eu/rest/v2/all?fields=name;region;population;currencies;languages";
var itemCount = 0;

async function showCardItem(countryName, regionName, population, languagesName, currenciesName) {
    //Grab data to from JSON file
    /*var countryName = "Country Name";
    var regionName = "Region Name";
    var currenciesName = "Currencies Name";
    var languagesName = "Languages Name";
    var population = "A lot";
    */

    // Open cardHolder div to add elements
    var cardHolder = document.getElementById("cardHolder");

    // Crate dummy elements to fill and add parameters
    //Assign the corresponding ID's and class to the elements
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

    //Assembles the cardItem element table with corresponding format
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

    // Adds the values to the cardItem
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


    //Adds the new table to the cardContainer Div
    cardHolder.appendChild(cardItem);
}

async function removeCardItems() {
    var cardHolder = document.getElementById("cardHolder");
    var cardItem = document.getElementById("hiddenCardItem")
    cardItem.remove()
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

async function getData(api_url) {
    const response = await fetch(api_url);
    const data = await response.json();
    var countryData = [];
    countryLang = "";
    countryCurr = "";
    for (i = 0; i < data[0].languages.length; i++) {
        countryLang = countryLang.concat(data[0].languages[i].name, " ");
    }
    for (i = 0; i < data[0].currencies.length; i++) {
        countryCurr = countryCurr.concat(data[0].currencies[i].name, " ");
    }
    countryData[0] = data[0].name;
    countryData[1] = data[0].region;
    countryData[2] = data[0].population;
    countryData[3] = countryLang;
    countryData[4] = countryCurr;

    return countryData;
}

async function getCountryByName() {                              /* Creates a query to retreive name */
    var name_url = "https://restcountries.eu/rest/v2/name/";
    var countryQuery = document.getElementById("simpleSearchBar").value;
    var new_name_url = name_url.concat(countryQuery);      //Retrieves the text as it gets clicked

    var countryData = await getData(new_name_url);
    try {
        removeCardItems();
    } catch (e) {
        logMyErrors(e);
    }
    showCardItem(countryData[0], countryData[1], countryData[2], countryData[3], countryData[4]);
}

async function searchCountryByName() {                              /* Creates a query to retreive name */
    var check = "";
    var check = document.getElementById("simpleSearchBar").value;
    if (check.length >= 2) {

        var name_url = "https://restcountries.eu/rest/v2/name/";
        var countryQuery = document.getElementById("simpleSearchBar").value;
        var new_name_url = name_url.concat(countryQuery, "?fields=name");      //Retrieves the text as it gets clicked
        try {
            const response = await fetch(new_name_url);
            const data = await response.json();

            for (var let in data) {
                var optionElement = document.createElement("option");
                optionElement.value = data[let].name;
                document.getElementById("countriesName").appendChild(optionElement);
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    else {
        var optionElement = document.createElement("option");
        optionElement.value = "";
        document.getElementById("countriesName").setAttribute.value(optionElement);

    }
}  