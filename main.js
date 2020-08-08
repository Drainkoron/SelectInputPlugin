const getTemplate = (options = [], selectedID) => {
    const stringMaxLength = 25
    let text = options.placeholder ?? "Placeholder"

    const items = options.items.map((item) => {
        let cls = ''
        if(item.value.length > stringMaxLength)
            item.value = item.value.substring(0, stringMaxLength) + '...'
        if (item.id === selectedID) {
          text = item.value
          cls = 'selected'
        }

        return `
          <div class="items ${cls}" data-type="item" data-id="${item.id}">${item.value}</div>
        `
    })

    let HTML = 
        `<div>
            <div data-type="input" class="input">
                <span>${text}</span>
                <div class="icon">+</div>
            </div>
            <div class="dropDownContainer">${items.join('')}</div>
        </div>`

    return HTML
}

class SelectInput{
    constructor(inputContainer, options){
        this.inputContainer = inputContainer
        this.options = options
        this.selectedID = 1
        
        this.#optionsUpdate(this.options)
        this.#render()
        this.#getElements(inputContainer)

        document.addEventListener("click", this.clickEvent);
    }

    #getElements = (inputContainer) => {
        this.$dropDown = inputContainer.getElementsByClassName("dropDownContainer")[0]
        this.$dropDownItems = this.$dropDown.getElementsByClassName("items")
        this.$icon = inputContainer.getElementsByClassName("icon")[0]
        this.$text = inputContainer.getElementsByClassName("input")[0].getElementsByTagName("span")[0]
    }

    #optionsUpdate = (options) => {
        options.items = [...new Set(this.options.items)];
        options.items = options.items.map((item, index) => {
            return {id: index, value: item}
        }) 
    }
    setItemToInput = (target) => {
        const newID = target.getAttribute("data-id")
        if(this.selectedID == newID)
            return

        this.$text.innerText = target.innerHTML
        Array.from(this.$dropDownItems).forEach(element => {
            element.classList.remove("selected")
        });

        target.classList.add("selected")
        this.selectedID = newID

        console.log(this.selectedID)

    } 

    get currentItem (){
        return this.$dropDownItems[this.selectedID]
    }

    get isOpen (){
        return this.inputContainer.classList.contains("open") 
    }

    open = () => {
        this.$icon.innerHTML = '-'
        this.inputContainer.classList.add("open")
    }
    
    close = () => {
        this.$icon.innerHTML = '+'
        this.inputContainer.classList.remove("open")
    }

    dropDownToggler = () => {
        console.log(this.isOpen)
        this.isOpen ? this.close() : this.open()
    }

    clickEvent = (e) => {
        const { dropDownToggler, setItemToInput, inputContainer, options } = this
        
        if (e.target.dataset.type == 'item')
            setItemToInput(e.target)
        else if (e.target.dataset.type == 'input' || e.target.parentElement.dataset.type == 'input')     
            dropDownToggler()
    }

    #render(){
        const { options, inputContainer, selectedID } = this
        inputContainer.innerHTML = getTemplate(options, selectedID)
    }

}

window.addEventListener("load", function(){
    const inputContainer = document.getElementsByClassName("SelectInput")[0]
    const SelectInputActionsContainer = document.getElementsByClassName("SelectInputActionsContainer")[0]
    const buttons = SelectInputActionsContainer.getElementsByClassName("buttons")
    const currentItemData = SelectInputActionsContainer.getElementsByClassName("currentItemData")[0]
    
    input = new SelectInput(inputContainer, {
        placeholder:'Placeholder',
        items:['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
    })
    
    const actions = (event) => {
        buttonType = event.target.getAttribute("data-type")
        
        switch(buttonType){
            case "open":
                input.open()
                break
            
            case "close":
                input.close()
                break

            case "getItem":
                currentItemData.innerHTML = input.currentItem.innerHTML
                break
        }

    }

    SelectInputActionsContainer.addEventListener("click", actions)

})