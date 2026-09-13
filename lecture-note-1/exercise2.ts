import { createElement } from "./exercise1";

type Degree = "LEIC" | "MEIC"
type Student = {
    name: string,
    nbr: number,
    degree: Degree,
}

function render(students: Array<Student>): HTMLElement{
    const header: HTMLElement = createElement(
        "thead",
        null, 
        createElement(
            "tr",
            null,
            createElement("th",null,"name"),
            createElement("th",null,"nbr"),
            createElement("th",null,"degree")
        )
    )
    const body: HTMLElement = createElement(
        "tbody",
        null,
        students.map(student => {
            return createElement(
                "tr",
                null,
                Object.values(student).map(value => {
                    return createElement("td",null,`${value}`)
                })
            )
        })
    )
    return createElement("table",null,header,body)
}