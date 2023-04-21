document.addEventListener('DOMContentLoaded', function(){
    // popup box
    const addBox = document.querySelector('.add-box')
    const popupBox = document.querySelector('.popup-box')
    const closeIcon = document.querySelector('header i')

    addBox.addEventListener('click', function(){
        popupBox.classList.add('show')
    })

    closeIcon.addEventListener('click', function(){
        popupBox.classList.remove('show')
    })

    // formInput
    const inputForm = document.querySelector('#inputBook')
    inputForm.addEventListener('submit',function(event){
        event.preventDefault()
        addBook()

        document.getElementById('inputBookTitle').value = ''
        document.getElementById('inputBookAuthor').value = ''
        document.getElementById('inputBookYear').value = ''
        document.getElementById('inputBookIsComplete').checked = false
    })

    // formSearch
    const searchButton = document.querySelector('#searchBookButton')
    searchButton.addEventListener('click', searchBook)

    if (isStorageExist()) {
        loadDataFromStorage();
    }
})