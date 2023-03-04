export class AllGames{
    constructor(){
        this.urlApi;
        this.finalRes;
        this.listLink = document.getElementsByClassName("nav-link");
        this.showGames("mmorpg");
        this.eventClick()

        this.ApiDetails;
        this.finalDetailsGame;
    }

    async showGames(Category){
        let loading = document.querySelector(".loading")
        loading.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fd0b8d4e1cmshedad9c86af27ee7p1278a1jsn740951964557',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
        this.urlApi = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${Category}`,options);
        this.finalRes = await this.urlApi.json();
        this.display();
        loading.classList.add("d-none");
    }

    display(){
        let cartona = '';
        for(let i = 0; i < this.finalRes.length; i++){
        cartona += `
        <div class="col-lg-3 col-md-6">
        <div class="card" onclick="">
          <div class="card-hrad p-3">
            <img src="${this.finalRes[i].thumbnail}" class="card-img-top rounded-2" alt="...">
          </div>
          <div class="card-body">
            <div class="card-title d-flex justify-content-between">
              <h5 class="card-title text-white">${this.finalRes[i].title}</h5>
              <span class="bg-secondary text-white p-1 rounded-1">Free</span>
            </div>
            <p class="card-text text-white-50 text-center">${this.finalRes[i].short_description}</p>
          </div>
          <div class="card-footer py-2 d-flex justify-content-between">
            <p class="bg-secondary text-white p-1 rounded-1">${this.finalRes[i].genre}</p>
            <p class="bg-secondary text-white p-1 rounded-1">${this.finalRes[i].platform}</p>
          </div>
        </div>
      </div>
        `
    }
    document.querySelector(".row").innerHTML = cartona;

    let card = document.querySelectorAll(".card")
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click",()=>{
            this.DetailsTheGame(this.finalRes[i].id);
        })        
    }
    this.showAndCloseDetails()
    }

    eventClick(){
        let classActive = document.querySelector(".active");
        for(let i = 0; i < this.listLink.length; i++){
            this.listLink[i].addEventListener("click",(e)=>{
                this.showGames(e.target.getAttribute("data-attr"));
                
                classActive.classList.remove("active");
                this.listLink[i].classList.add("active");
                classActive = this.listLink[i];
            })
        }
    }

    showAndCloseDetails(){
        let closeDetails = document.querySelector(".close");
        let Details = document.querySelector(".Details");
        let cards = document.querySelectorAll(".card");
        for(let i = 0; i<cards.length;i++){
            cards[i].addEventListener("click", (e)=>{
                Details.style.display = "block"
            })
        }
        closeDetails.addEventListener("click", (e)=>{
            Details.style.display = "none"
        })
    }

    async DetailsTheGame(id){
        let loading = document.querySelector(".loading")
        loading.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '32e4fec2damsh1d8be6792944820p16a3f1jsn8bf5b6d3f974',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        this.ApiDetails = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
        this.finalDetailsGame = await this.ApiDetails.json();

        let cartona = `
        <div class="col-md-4">
        <div class="img-game">
          <img src="${this.finalDetailsGame.thumbnail}" alt="img-game">
        </div>
      </div>
      <div class="col-md-8">
        <div class="Details-game text-white">
          <h3 class="mb-4">${this.finalDetailsGame.title}</h3>
          <p>Category: <span class="p-1 bg-info rounded-2 text-black">${this.finalDetailsGame.genre}</span></p>
          <p>Platform: <span class="p-1 bg-info rounded-2 text-black">${this.finalDetailsGame.platform}</span></p>
          <p>Status: <span class="p-1 bg-info rounded-2 text-black">${this.finalDetailsGame.status}</span></p>
          <p>${this.finalDetailsGame.description}</p>
        <a href="${this.finalDetailsGame.game_url}"><button class="btn btn-outline-warning">Show Game</button></a>
          
        </div>
      </div>
        `
        document.querySelector(".Details .row").innerHTML = cartona;
        loading.classList.add("d-none");
    }
}









