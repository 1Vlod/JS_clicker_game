class Modal {
    constructor(options){
        this.width = options.width 
        this.fade = options.fade 
        this.header = options.header 
        this.text = options.text 
        this.closable = options.closable
        this.id = options.id
        this.refr = options.btnRefr
    }

    

    create(){
        const div = document.createElement("div")
        div.classList.add("modal__wrapper")
        div.id = this.id || "modal"
        if(this.fade){
            div.style.background = "rgba(0, 0, 0, 0.5)"
        }
        const html = `<div class="modal" style="width: ${this.width};">
            <div class="modal__header">
                <h2 class="modal__title">${this.header}</h2>
                ${this.closable ? '<span class="modal__close">&times;</span>' : ""}
            </div>
            <div class="modal__content">
                <span class="modal__score">${this.text}</span>
            </div>
            <div class="modal__footer">
                <button class="modal__btn-continue">Продолжить</button>
                <button class="modal__btn-refresh">Начать заново</button>
            </div>

        </div>`
        div.innerHTML = html
        // div.querySelector(".modal__close").addEventListener("click", () => {
        //     this.modalClose()
        //     this.modalRemove()
        // })
        div.addEventListener("click", e => {
            const targetClasses = e.target.classList
            if(targetClasses.contains("modal__close") || e.target.tagName == "BUTTON"){
                this.modalClose()
                setTimeout(() => this.modalRemove(), 300)
                if(targetClasses.contains("modal__btn-refresh")){
                    this.refr()
                }
            }
        })
        document.body.appendChild(div)
    }

    open(){
        document.querySelector("#" + this.id).classList.add("show")
    }

    modalClose(){

        document.querySelector("#" + this.id).classList.remove("show")
    }

    modalRemove(){
        document.querySelector("#" + this.id).remove()
    }
}