import React from 'react'

function Cards(props) {
    return (
        <div className="col-md-4 pb-5">
            <img className='pb-4' src={props.data.imageUrl} alt='restaurant' />
            <h6 className='restaurantName'>{props.data.restaurantName}</h6>
            <span className='category'>{props.data.catagory}</span>
        </div>
    )
}

export default Cards