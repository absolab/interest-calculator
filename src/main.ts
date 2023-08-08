import van from "vanjs-core"
import "./style.scss"

const {div, p, table, thead, tbody, th, tr, td} = van.tags

const Main = () => {
  const dom = 
  div( {class: "root"},
    p( "hello")
  )

  return dom
}

van.add(document.body, Main())
