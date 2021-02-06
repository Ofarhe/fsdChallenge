//Programmers Note:
// for readibility, it is suggested to set rulers to [80, 120, 150]

            /*   *****                      TABLE OF CONTENTS                       ***** */
            /*
            SECURITY AND CONTROL FUNCTIONS
            ITEM HANDLERS
            DATA HANDLERS
            BUTTON FUNCTIONS
            SEARCHBAR FUNCTIONS
            */
            /*   *****     -------------------------------------------------        ***** */



/*   *****    -----------------------------------------------------------------------------------------------   ***** */
/*   *****                                  SECURITY AND CONTROL FUNCTIONS                                      ***** */

//        Displays an alert dialog in case a word with length <3 is entered
async function showDialogAlert() {
    var securityAlertItem = document.getElementById("securityAlert");
    if (typeof securityAlertItem.showModal === "function") {
        securityAlertItem.showModal();
    } else {
        alert("Your browser does not support dialog element!");
    }
}

//        Closes Alert Dialog
async function closeAlert() {
    document.getElementById("securityAlert").close();
}

/*   *****    -----------------------------------------------------------------------------------------------   ***** */
/*   *****    -----------------------------------------------------------------------------------------------   ***** */



/*   *****    -----------------------------------------------------------------------------------------------   ***** */
/*   *****                                           ITEM HANDLERS                                              ***** */

//        Display the countries information on the 'cardItems'
async function showCardItem(                                                    // Show the name items on screen
    countryName, regionName, population, languagesName, currenciesName) {
    // !Receives data from request
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

//        Remove the 'cardItems'
async function removeCardItems() {                                              // Removes card items if requested
    var cardHolder = document.getElementById("cardHolder");
    var cardItem = document.getElementById("hiddenCardItem")
    document.getElementById("cardHolder").innerHTML = "";
}
/*   *****    -----------------------------------------------------------------------------------------------   ***** */
/*   *****    -----------------------------------------------------------------------------------------------   ***** */



/*   *****    ---------------------------------------DATA HANDLERS-------------------------------------------   ***** */

//        Retreives the response and returns a the data needed
async function getData(api_url) {
    let countriesData = await fetch(api_url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
            // Shows three alerts for any to be used in case the query status equals 404
                console.log("Such country doesn't exist! ='( Try typing again.")
                alert("Such country doesn't exist!! \n ='( \n Try typing again.")
                throw new TypeError("Such country doesn't exist!!! ='( \n")
            /*
            Any of these methods are to be replaced by the appropiate method to handle
            Be it display an image, a text, resfresh info
            Or just tell the developer what the issue is
            */
            }
        })
        .then(res => {
            return res;
        })
        .catch(error => {                                                       // Catches any error that might happen during the conection
            console.log(`ERROR. Such country doesn't exist! .__,`)
            console.log(error)
        });
    return countriesData;
}
/*   *****    -----------------------------------------------------------------------------------------------   ***** */




/*   *****                                         BUTTON FUNCTIONS                                             ***** */
//        Button function to search and populate the card items
async function getCountryByName() {                                             /* Creates a query to retreive name(s) clicking the Search button */

    var inputList = document.getElementById("simpleSearchBar");                 // Gets the searchbar item
    var check = inputList.value;                                                // Gets the value of the searchbar
    if (check.length <= 2) {                                                    // Security check on the searchbar data
        // Security thing
        showDialogAlert();
        console.log("SecurityAlert");
    } else if (check.length > 2) {                                              // Double security check on the searchbar :D
        try {
            removeCardItems();                                                  // Removes any existing Country Cards on the screen
        } catch (e) {
            logMyErrors(e);
        }

        var name_url = "https://restcountries.eu/rest/v2/name/";
        var countryQuery = document.getElementById("simpleSearchBar").value;
        var new_name_url = name_url.concat(                                     // Assembles the query to search     
            countryQuery,
            "?fields=name;region;population;currencies;languages");             

        getData(new_name_url).                                                  // Calls get_Data function to retreive the country information
            then((countryData) => {                                             // Waits for countryData to be returned and process the data

                countryLang = "";                                               //
                countryCurr = "";
                let noItems = countryData.length;

                for (i = 0; i < noItems; i++) {                                 // Runs the data and retreives the information
                    let languages = ""                                          //...
                    let currencies = ""
                    let noCurr = countryData[i].currencies.length;
                    let noLangs = countryData[i].languages.length;

                    let name = countryData[i].name;
                    let region = countryData[i].region;
                    let pop = countryData[i].population;
                    for (let j = 0; j < noLangs; j++) {
                        if (j == noLangs - 1) {
                            languages = languages.concat(countryData[i].languages[j].name);
                        } else {
                            languages = languages.concat(countryData[i].languages[j].name, ", ");
                        }
                    }

                    for (let j = 0; j < noCurr; j++) {
                        if (j == noCurr - 1) {
                            currencies = currencies.concat(countryData[i].currencies[j].name);
                        } else {
                            currencies = currencies.concat(countryData[i].currencies[j].name, ", ");
                        }                                                       //...
                    }                                                           // to be used in the showCardItem function

                    showCardItem(name, region, pop, languages, currencies);     //Get elements in the response and prints them with showCardItemCard()
                }
            })
            .catch((err) => {                                                   //If something went wrong and reaches here
                console.log(`Error Log: --- ${err}`)                            //catches the error and displays a dummy
            });
    }
}
/*   *****    -----------------------------------------------------------------------------------------------   ***** */
/*   *****    -----------------------------------------------------------------------------------------------   ***** */



/*   *****    -----------------------------------------------------------------------------------------------   ***** */
/* *****                                        SEARCHBAR FUNCTIONS                                             ***** */
//        SearchBar function to search and populate the dropdown list
async function searchCountryByName() {                                          // Creates a query to retreive name while typing in the dropdown list
    var inputList = document.getElementById("simpleSearchBar");                 // Call the searchbar
    var check = inputList.value;                                                // Call the value of the searchbar
    if (check.length > 2) {                                                     // Check the length of the word,

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

            for (var let in data) {                                             // Fills the list element with matching countries
                var optionElement = document.createElement("option");
                optionElement.setAttribute("id", "optionItem");
                optionElement.value = data[let].name;
                countriesName.appendChild(optionElement);
            }
        }
        catch (error) {                                                         //Error handler
            console.error(error)
        }
    }
    else {                                                                      //Else: query length is less than 2, do nothing.
        var optionElement = document.createElement("option");
        document.getElementById("countriesName").innerHTML = "";

    }
}
/*   *****    -----------------------------------------------------------------------------------------------   ***** */
