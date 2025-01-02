import React from 'react'

const Counter = ({ count, text }) => {
    return (
        <div className="count__content">
            <h3 className="count__content--title-1 counter">{count}</h3>
            <h3 className="count__content--title-2">K</h3>
            <span className="count__content--plus">+</span>
            <p className="count__content--paragraph">{text}</p>
        </div>
    )
}

export default React.memo(Counter)