import React from 'react'

export default function Product(props) {
    let picture = props.picture;
    let name = props.name;
    let price = props.price;
    let department = props.department;
    let quantity = props.quantity;
    let totalWeight = props.totalWeight

    return (
        <div>
            {<img src={picture} />}
            <h1 className="name"> {name}</h1>
            <p className="name">{price}</p>
            <p className="name">  kg: {totalWeight}</p>
            <p className="name">quantity:{quantity}</p>

        </div>
    )
}