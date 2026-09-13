type createElementName = string 
type createElementAtributes = { [index:string]: string | boolean } | null
type createElementChildren = string | HTMLElement | HTMLElement[]

export function createElement(
    name: createElementName,
    attributes?: createElementAtributes,
    ...children: createElementChildren[]
): HTMLElement {
    let element: HTMLElement = document.createElement(name)
    if(attributes !== undefined) addElementsAtributtes(attributes,element)
    if(children !== undefined) addElementChildren(children, element)
    return element
}

function addElementChildren(children: createElementChildren[], element: HTMLElement): void{
  children.forEach(child => {
        if(typeof child === "string")
            element.textContent = child
        else if(Array.isArray(child))
            element.append(...child)
        else
            element.appendChild(child)
    })
}

function addElementsAtributtes(attributes: createElementAtributes, element: HTMLElement): void{
    if(attributes != null || attributes != undefined){
        for(const [key,entry] of Object.entries(attributes)){
            if(typeof entry === "boolean"){
                if(entry)
                    element.setAttribute(key,"")
            }else{
                element.setAttribute(key, entry)
            }
        }
    }
}

// Valid usages

createElement("div")
createElement("p", null, "Hello World")
createElement("a", {href: "https://www.typescriptlang.org"}, "typescript")
createElement("button", {disabled: true}, "Press me")
createElement("ul", null,
    createElement("li", null, "Item 1"),
    createElement("li", null, "Item 2"),
)
const items = [
    "item 1",
    "item 2",
]
createElement("ul", null,
    items.map(item => createElement("li", null, item))
)

// invalid usages
//createElement(true)
//createElement("a", {foo: 1 })
//createElement("a", {}, true)
//createElement("a", {}, [true])