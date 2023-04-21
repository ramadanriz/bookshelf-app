const STORAGE_KEY = 'BOOKSHELF_APPS'
let books = []

const isStorageExist = function(){
    if (typeof (Storage) === undefined) {
      alert('Your browser doesn\'t support web storage')
      return false
    }
    return true;
}

const saveData = function() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(books)
      localStorage.setItem(STORAGE_KEY, parsed)
    }
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (book of data) {
        books.push(book);
      }
    }
   
    document.dispatchEvent(RENDER_EVENT);
}