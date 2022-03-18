import React from 'react';


function Favs({article, update}) {
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const toggleImage = () => setIsSelected(!isSelected);
    const [isSelected, setIsSelected] = React.useState(false);

    const unsetFav = (i) => {
        if (localStorage.getItem("favs") === null) {
            console.log("vacio");
        }else{
            var aux = JSON.parse(localStorage.getItem('favs'));
            var index = aux.map(x => {
                return x.objectID;
              }).indexOf(i);
            aux.splice(index, 1);
            localStorage.setItem('favs', JSON.stringify(aux));
            update()
        }   
    }
    
    if (!article.objectID) return null;
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
                    <button className="rectangle-fav" onClick={()=> unsetFav(article.objectID)}>
                        <img src="img/iconmonstr-favorite-3.svg"
                        className="iconmonstr-favorite-3" alt='fav'>
                        </img>
                    </button>
                    ) : (
                        
                        <button className="rectangle-fav" >
                            <img src="img/iconmonstr-favorite-3.svg"
                            className="iconmonstr-favorite-2" alt='fav'>
                            </img>
                        </button>
                    )}
                </div>
            </div>
        </div>

             
    )
}

export default Favs