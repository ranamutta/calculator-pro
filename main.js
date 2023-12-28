const harcamaInput = document.querySelector("#harcama")
const fiyatInput = document.querySelector("#fiyat")
const formBtn = document.querySelector(".ekle-btn")
const list = document.querySelector(".list")
const totalInfo = document.querySelector("#total-info")
const nameInput = document.getElementById("name-input")
const statusCheck = document.getElementById("status-input")
const selectFilter = document.getElementById("filter-select")




const userName = localStorage.getItem("name")

nameInput.value = userName
nameInput.addEventListener("change", (e) => {
       localStorage.setItem("name", e.target.value)
})

formBtn.addEventListener("click", addExpense)
list.addEventListener("click", handleClick)
selectFilter.addEventListener("change", handleFilter)
let toplam = 0

function updateToplam(fiyatBilgisi) {

       toplam += Number(fiyatBilgisi)
       totalInfo.innerText = toplam



}

function addExpense(e) {

       e.preventDefault()

       if (!harcamaInput.value || !fiyatInput.value) {
              alert("Tüm boş alanları doldurun")
              return
       }


       const harcamaDiv = document.createElement("div")
       harcamaDiv.classList.add("expense")

       if (statusCheck.checked) {
              harcamaDiv.classList.add("payed")
       }







       harcamaDiv.innerHTML =
              `<h2>${harcamaInput.value}</h2>
 <h2 id="value">${fiyatInput.value}</h2>
  <div class="buttons">
       <img id="payment" src="img/pay.png" alt="">
       <img id="remove" src="img/remove.png" alt="">
  </div>`

       list.appendChild(harcamaDiv)
       updateToplam(fiyatInput.value)
       harcamaInput.value = ""
       fiyatInput.value = ""

}



function handleClick(e) {
       let tiklanilanEleman = e.target
       if (tiklanilanEleman.id === "remove") {

              const kapsayiciElement = tiklanilanEleman.parentElement.parentElement
              const deletedPrice = kapsayiciElement.querySelector("#value").innerText
              updateToplam(-Number(deletedPrice))
              kapsayiciElement.remove()

       }

}

function handleFilter(e) {
       const harcamaKartlari = list.childNodes
       const filterValue = e.target.value
       harcamaKartlari.forEach((harcamaKarti) => {
              switch (filterValue) {
                     case "all": harcamaKarti.style.display = "flex"
                            break

                     case "payed": if (!harcamaKarti.classList.contains("payed")) {
                            harcamaKarti.style.display = "none"
                     } else {
                            harcamaKarti.style.display = "flex"
                     }
                            break

                     case "not-payed": if (harcamaKarti.classList.contains("payed")) {
                            harcamaKarti.style.display = "none"
                     } else {
                            harcamaKarti.style.display = "flex"
                     }
                            break
              }
       })
}