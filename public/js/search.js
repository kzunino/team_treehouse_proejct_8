const tbody = document.querySelector('tbody');
const bookList = document.querySelectorAll('tr.books');
const table = document.querySelector('table');
const body = document.querySelector('body');
const pages = Math.ceil(bookList.length/10);
const searchInput = document.querySelector('input');
let resultList = [];
let searchCount = '';


// ******** Function for creating, modifying, and appending elements for DRY ****************

const createElement = (elementName, setClass, domNode, value, text) => {  //refactored code for DRY
  const element = document.createElement(elementName);      //creates new DOM elements
  element.className += setClass;                            //gives dom elements new class names
  domNode.appendChild(element);                             // appends new elemement to DOM
  element.type = value;                                     // sets element type
  element.textContent = text;                               //sets element text content
  return element;
};

const notFoundDiv = createElement('div', 'notFound', body, undefined, undefined);
const notFoundText = createElement('h1', undefined, notFoundDiv, undefined, 'No match for this book in the database. Please try again.');
notFoundDiv.style.display = 'none';

// ********** showPage Function *********

const showPage = (bookList, page) => {
  let lastListItem = (page * 10) - 1;                    //stores the last item's index value
  let firstListItem = (lastListItem - 9);               //stores the first item's index value
  for (var i = 0; i < bookList.length ; i += 1) {   //itterates through the book list
    if (i >= firstListItem && i <= lastListItem){      //conditional statement to iterate through list segments (note to self don't use bookLsit[i]) and hide or display list items
      bookList[i].style.display = '';
    }else{
      bookList[i].style.display = 'none'; //hides list items
    }
  }
};

showPage(bookList, 1); //shows first page of book list when page is first opened

// ******** Creating and appending pages *****************

const appendPageLinks = (pages, bookList) => {
  if (document.contains(document.querySelector('.pagination'))) { // if statement checks to see if newDiv exists and deletes it.
    document.querySelector('.pagination').remove();               // this stops duplicate paginations links. Source: https://stackoverflow.com/questions/21591235/jscript-check-if-element-exists-and-remove-it
  };

  const newDiv = createElement('div', 'pagination', body, undefined, undefined);  //calls function to create newDiv, class, and appends it.
  const newUl = createElement('ul', 'pages', newDiv, undefined, undefined);

  const selectNewUl = document.querySelector('ul')

      for (var i = 1; i <= pages; i+= 1){
        const newLi = createElement('li', undefined, newUl, undefined, undefined);   //creates a list item in pageLinks and appends to newUL. (undefined skips middle parameter source:https://stackoverflow.com/questions/8356227/skipping-optional-function-parameters-in-javascript)
        const aTag = createElement('a', 'pageNum', newLi, undefined, undefined);    // creates a tags and appends to newLI
        aTag.setAttribute('href','#');                        //sets attribute for href link
        aTag.textContent = i;                                 //changes page numbers per each itteration
      }
  const aTagList = document.querySelectorAll('a.pageNum');
  selectNewUl.addEventListener('click', (e) => {          //uses bubbling to target ancestor ul of a tags.
    if (event.target.className === 'pageNum' ){
      showPage(bookList, event.target.textContent); //calls function with aTag's text content, which is a corresponding page number;
      for (var i = 0; i < aTagList.length; i += 1){
        aTagList[i].classList.remove('active');       //removes active class from item
      }
    event.target.className = 'pageNum active';                //activates CSS for clicked page link
      }
    });
    if (document.contains(document.querySelector('a.pageNum'))) { // if statement checks to see if a tag exists.
      aTagList[0].className = 'pageNum active';                 //adds active class to first as default, if exists. Wont throw error with conditional, if no a tags exist when no search results exist.
    }
};

appendPageLinks(pages, bookList);

// ****** Search Functionality *********

const searchFunctionality = () => {                     //This function works for both search listeners. DRY principles at work
  const searchText = searchInput.value.toUpperCase();
  resultList = [];                                    // stores results in empty array
  searchCount = 0;                                 //counts results from loop
    for (var i = 0; i < bookList.length; i ++){                      // loop through book list
        bookList[i].style.display = 'none';
        if (bookList[i].children[0].textContent.toUpperCase().indexOf(searchText) > -1
            || bookList[i].children[1].textContent.toUpperCase().indexOf(searchText) > -1
            || bookList[i].children[2].textContent.toUpperCase().indexOf(searchText) > -1
            || bookList[i].children[3].textContent.toUpperCase().indexOf(searchText) > -1
            ){
            searchCount ++;                                                   //for every match it adds to search count variable
            resultList.push(bookList[i]);
          }
        }
  if (searchCount === 0){   //if the search count is === to 0 then notFoundDiv appears.
    notFoundDiv.style.display = '';
  }else{
    notFoundDiv.style.display = 'none';  //if it's not === 0 then it dissappears.
  }
  const resultPages = Math.ceil(resultList.length/10); // changes page numbers based on results.
  showPage(resultList, resultPages);        //inserts resultList collection as an array and resultPage as arguments
  appendPageLinks(resultPages, resultList); //calls appendPageLinks function with new arguments.
  showPage(resultList, 1);                  //recall makes it so it shows page one of new results list.

  if (searchText.length === 0){ // if search goes back to blank recalls showPage fucntion to reset original pagination.
    showPage(bookList, 1);
  }
};


searchInput.addEventListener('keyup', (e) => {      //Search Input listener
  searchFunctionality();                            //calls function to execute search
});
