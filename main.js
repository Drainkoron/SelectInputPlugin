import { SelectInput } from "./SelectInput.js"

window.addEventListener("load", function(){
    const inputContainer = document.getElementsByClassName("SelectInput")[0]
    const SelectInputActionsContainer = document.getElementsByClassName("SelectInputActionsContainer")[0]
    const buttons = SelectInputActionsContainer.getElementsByClassName("buttons")
    const currentItemData = SelectInputActionsContainer.getElementsByClassName("currentItemData")[0]
    
    let input = new SelectInput(inputContainer, {
        placeholder:'Placeholder',
        items:['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
    })
    
    const actions = (event) => {
        let buttonType = event.target.getAttribute("data-type")
        
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