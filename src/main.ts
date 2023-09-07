import van from "vanjs-core"
import "./style.scss"

const {div, input, button} = van.tags

const Main = () => {
  const money     = van.state(0);   // 월 납입금
  const month     = van.state(0);   // 개월수
  const rate      = van.state(0);   // 이율
  const tax       = van.state(0);   // 세금
  const result    = van.state(0);   // 계산 결과
  const principal = van.state(0);   // 원금
  const interest  = van.state(0);   // 이자

  const calc = () => {
    let m = 0;
    let mrate = rate.val / 12 / 100;
    for (let i=0; i<month.val; ++i) {
      m = ((m + Number(money.val)) * (1 + mrate))
      console.log(m);
    }
    principal.val = month.val * money.val;
    interest.val = m - principal.val;

    interest.val = Math.floor(interest.val * (1 - tax.val / 100));

    result.val = interest.val + principal.val;
  }

  const dom = 
  div( {id: "root"},
    div ( {id: "header-wrap"},
      div ( {id: "header"},
        div ( {class: "item-wrap"}, 
          div ( {class: "item-title"}, "월 납입금" ),
          div ( {class: "item-content"},
            input ({type:"number", class: "item-input", onchange: e => money.val = e.target.value }),
            div ({class: "month-text"}, "원")
          )
        ),

        div ( {class: "item-wrap"}, 
          div ( {class: "item-title"}, "기간"),
          div ( {class: "item-content"},
            input ({type: "number", class: "item-input", onchange: e => month.val = e.target.value }), 
            div ({class: "month-text"}, "개월")
          ),
        ),

        div ( {class: "item-wrap"}, 
          div ( {class: "item-title"}, "이율" ),
          div ( {class: "item-content"},
            input ({type: "number", class: "item-input", onchange: e => rate.val = e.target.value}),
            div ({class: "month-text"}, "%")
          )
        ),

        div ( {class: "item-wrap"}, 
          div ( {class: "item-title"}, "세금" ),
          div ( {class: "item-content"},
            input ({type: "number", class: "item-input", onchange: e => tax.val = e.target.value }),
            div ({class: "month-text"}, "%")
          )
        ),

        div ( {class: "item-wrap"}, 
        button ({type: "button", class: "item-button", onclick: () => calc()}, "계산")
        ),
        div ( {class: "item-wrap"}, 
          div ( {class: "item-title"}, "예상 수령액"),
          div ( {class: "item-content"},
            input ({readonly: "true", class: "item-input", value: result}),
            div ({class: "month-text"}, "원"),
          )
        ),
        div ( {class: "item-wrap"}, 
          div ( {class: "item-title"}, "원금"),
          div ( {class: "item-content"},
            input ({readonly: "true", class: "item-input", value: principal}),
            div ({class: "month-text"}, "원"),
          )
        ),
        div ( {class: "item-wrap"}, 
          div ( {class: "item-title"}, "이자"),
          div ( {class: "item-content"},
            input ({readonly: "true", class: "item-input", value: interest}),
            div ({class: "month-text"}, "원"),
          )
        ),
      )
    )
  )

  return dom
}

van.add(document.body, Main())
