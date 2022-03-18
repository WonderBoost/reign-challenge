import React from 'react';

function NewsCard({article, active, handleChangeActive}) {
    const [toggled, setToggled] = React.useState(true);
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const toggleImage = () => setIsSelected(!isSelected);
    const [isSelected, setIsSelected] = React.useState(false);
    const setFav = (data, i) => {
        localStorage.setItem('favs', JSON.stringify(data[i]))
        console.log(data, i, 'luismiguel');
    }
    const unsetFav = (data, i) => {
        localStorage.removeItem('favs', JSON.stringify(data[i]))
    }
    if (!article.title) return null;
    return (
        <div className='content-all'>
            <div className='rectangle-news' >
                <div>
                    <div className='section-info' href='article.url' onClick={() => openInNewTab(article.url)}>
                        <span className='time'>
                            <img src="img/iconmonstr-time-2.svg"
                            className="iconmonstr-time-2" alt='timer'>
                            </img>
                            {article.created_at}
                            &nbsp;by {article.author}
                        </span>
                        <br></br>
                        <span className='new-title'>{article.title}</span>
                    </div>
                    {!isSelected ? (
                    <button className="rectangle-fav" onClick={()=> setFav(article,article.objectID)}>
                        <img onClick={toggleImage} src="img/iconmonstr-favorite-2.svg"
                        className="iconmonstr-favorite-2" alt='fav'>
                        </img>
                    </button>
          ) : (
            
            <button className="rectangle-fav">
                <img onClick={toggleImage} src="img/iconmonstr-favorite-3.svg"
                className="iconmonstr-favorite-3" alt='fav'>
                </img>
            </button>
          )}
                </div>
            </div>
        </div>

             
    )
}

export default NewsCard