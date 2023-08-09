const accessKey="iJLk-PS1kMmELuEdBeZiucN3fjGHTlhV9YRQ_nFYaKc"

const formEL=document.querySelector("form")
const inputEL=document.getElementById("search")
const searchResunts = document.querySelector('.search-results')
const showMore =document.getElementById("show")


let inputData=""
let page=1;


async function searchImages(){
    inputData=inputEL.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data  = await response.json()
    const results = data.results


    if(page === 1){
        searchResunts.innerHTML = ""
    }
    results.map((result)=>{
        const imageWrapper=document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image=document.createElement('img')
        image.src=result.urls.small
        image.alt=result.alt_description
        const imageLink=document.createElement('a')
        imageLink.href=result.links.html
        imageLink.target="_blank"
        imageLink.textContent=result.alt_description


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResunts.appendChild(imageWrapper);

    });
    page++

if(page>1){
    showMore.style.display="block"
}
}
formEL.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
})
showMore.addEventListener('click',()=>{
    searchImages()
})