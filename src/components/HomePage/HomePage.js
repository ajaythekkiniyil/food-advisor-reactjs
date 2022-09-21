import { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from './Cards'
function HomePage() {
    const [restaurantsObj, setRestaurantsObj] = useState([])
    const [filterValue, setfilterValue] = useState(false)
    const apiEndPoint = 'https://food-advisor-plrvc.ondigitalocean.app/api/restaurants?fields=name,description&populate=image,categories'
    const imagePath = 'https://food-advisor-plrvc.ondigitalocean.app/'
    useEffect(() => {
        const checked = document.getElementById('filter-all').checked =true
        axios.get(apiEndPoint)
            .then((resp) => {
                setRestaurantsObj(resp.data.data)
            })
    }, [])
    return (
        <section className='homePage'>
            <div className="container">
                <div className="row">
                    <div className="col-md-2 filter">
                        <h6 className='title'>Categories</h6>
                        <ul className='borderRight'>
                            <li><input type="radio" name='filter' id='filter-all' value='all' onClick={(e) => setfilterValue(e.target.value)} />&nbsp; All</li>
                            <li><input type="radio" name='filter' value='french' onClick={(e) => setfilterValue(e.target.value)} />&nbsp; French</li>
                            <li><input type="radio" name='filter' value='italian' onClick={(e) => setfilterValue(e.target.value)} />&nbsp; Italian</li>
                            <li><input type="radio" name='filter' value='fusion' onClick={(e) => setfilterValue(e.target.value)} />&nbsp; Fusion</li>
                        </ul>
                    </div>
                    <div className="col-md-10 restaurantList">
                        <h4 className='title'>Best restaurants in Paris</h4>
                        <div className="row pb-5">
                            {
                                restaurantsObj.map((data) => {
                                    const catagory = (data.attributes.categories.data[0]) ? data.attributes.categories.data[0].attributes.categoryName : ''
                                    const imageUrl = imagePath + data.attributes.image.data[0].attributes.formats.thumbnail.url
                                    const restaurantName = data.attributes.name
                                    const obj = {
                                        'catagory': catagory,
                                        'restaurantName': restaurantName,
                                        'imageUrl': imageUrl,
                                    }
                                    let restaurantList = ''
                                    if(filterValue){
                                        if(filterValue===catagory){
                                            restaurantList = <Cards data={obj} />
                                        }
                                        if(filterValue==='all'){
                                            restaurantList = <Cards data={obj} />
                                        }
                                    }
                                    return(
                                        (!filterValue) ? <Cards data={obj}/>: restaurantList
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage