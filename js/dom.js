const RENDER_EVENT = new Event('render-book')

document.addEventListener('render-book', function(){
    const uncompletedBookList = document.querySelector('#books')
    uncompletedBookList.innerHTML = ''

    const completedBookList = document.querySelector('#completed-books')
    completedBookList.innerHTML = ''

    for(let bookItem of books){
        const bookElement = makeBook(bookItem)
        if(!bookItem.isCompleted)
            uncompletedBookList.append(bookElement)
        else
            completedBookList.append(bookElement)
    }
})

const generateBookObject = function(id, title, author, year, isCompleted){
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

const addBook = function(){
    const bookTitle = document.querySelector('#inputBookTitle').value
    const bookAuthor = document.querySelector('#inputBookAuthor').value
    const bookYear = document.querySelector('#inputBookYear').value
    const inputBookIsComplete = document.querySelector('#inputBookIsComplete').checked

    const generateId = +new Date()
    const bookObject = generateBookObject(generateId, bookTitle, bookAuthor, bookYear, inputBookIsComplete)
    books.push(bookObject)

    document.dispatchEvent(RENDER_EVENT)
    saveData()
}

const makeBook = function(bookObject){
    const textTitle = document.createElement('h3')
    textTitle.innerText = bookObject.title

    const textAuthor = document.createElement('p')
    textAuthor.innerText = bookObject.author

    const textYear = document.createElement('span')
    textYear.innerText = bookObject.year

    // menu container
    const menuContainer = document.createElement('ul')
    menuContainer.classList.add('menu')

    // details container
    const detailsContainer = document.createElement('div')
    detailsContainer.classList.add('details')
    detailsContainer.append(textTitle, textAuthor, textYear)

    // bottom-content container
    const bottomContent = document.createElement('div')
    bottomContent.classList.add('bottom-content')
    bottomContent.append(menuContainer)

    // container
    const container = document.createElement('div')
    container.classList.add('book-list')
    container.append(detailsContainer, bottomContent)
    container.setAttribute('id', `${bookObject.id}`)

    if(bookObject.isCompleted){
        const unreadButton = document.createElement('li')
        unreadButton.innerHTML = '<i class="uil uil-history-alt"></i>Unread'
        unreadButton.addEventListener('click', function(){
            undoBookFromCompleted(bookObject.id)
        })

        const deleteButton = document.createElement('li')
        deleteButton.innerHTML = '<i class="uil uil-trash"></i>Delete'
        deleteButton.addEventListener('click', function(){
            deleteBook(bookObject.id)
        })

        menuContainer.append(unreadButton, deleteButton)
    } else{
        const readButton = document.createElement('li')
        readButton.innerHTML = '<i class="uil uil-check-circle"></i>Read'
        readButton.addEventListener('click', function(){
            addBookToCompleted(bookObject.id)
        })

        const deleteButton = document.createElement('li')
        deleteButton.innerHTML = '<i class="uil uil-trash"></i>Delete'
        deleteButton.addEventListener('click', function(){
            deleteBook(bookObject.id)
        })

        menuContainer.append(readButton, deleteButton)
    }

    return container
}

const findBook = function(bookId){
    for(let bookItem of books){
        if(bookItem.id === bookId){
            return bookItem
        }
    }
    return null
}

const findBookIndex = function(bookId){
    for(let index in books){
        if(books[index].id === bookId){
            return index
        }
    }
    return -1
}

const addBookToCompleted = function(bookId){
    const bookTarget = findBook(bookId)
    if(bookTarget == null) return

    bookTarget.isCompleted = true
    document.dispatchEvent(RENDER_EVENT)
    saveData()
}

const deleteBook = function(bookId){
    const bookTarget = findBookIndex(bookId)
    let confirmDialog = confirm('Anda yakin akan menghapus data buku ini ?')
    if(bookTarget === -1) return
    if(confirmDialog == true){
        books.splice(bookTarget, 1)
        document.dispatchEvent(RENDER_EVENT)
        saveData()
    }else{
        return 0
    }
    
}

const undoBookFromCompleted = function(bookId){
    const bookTarget = findBook(bookId)
    if(bookTarget == null) return

    bookTarget.isCompleted = false
    document.dispatchEvent(RENDER_EVENT)
    saveData()
}

const searchBook = function(){
    const searchTitle = document.getElementById('searchBookTitle').value
    const detailsElement = document.querySelectorAll('.book-list')

    for(let title of detailsElement){
        if(title.childNodes[0].childNodes[0].innerText.toLowerCase().includes(searchTitle.toLowerCase())){
            title.setAttribute("style", "display : block;")
        } else {
            title.setAttribute("style", "display: none;")
        }    
    }
}