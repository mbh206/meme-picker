import catsData from "./data.js"

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

memeModalCloseBtn.addEventListener('click', closeModal)
emotionRadios.addEventListener('change', (e) => highlighter(e))
getImageBtn.addEventListener('click', renderCat)

function closeModal(){
    memeModal.style.display = 'none'
}

function highlighter(e){
    const radioClasses = document.getElementsByClassName('radio')
    for (let radioClass of radioClasses){
        radioClass.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function renderCat(){
    const catObject = getSingleCatObject()
    console.log(catObject)
    memeModal.style.display = 'flex'
    memeModalInner.innerHTML = `
    <img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">`
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1){
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGifd = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(cat => {
            if(isGifd){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            } 
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
            radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label><input type="radio" id="${emotion}" value="${emotion}" name="emotions">
            </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)