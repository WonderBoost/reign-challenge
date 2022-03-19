import React from 'react';

function NewsCard({article}) {
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    
    const [isSelected, setIsSelected] = React.useState(false);

    const setFav = (data) => {
        if (localStorage.getItem("favs") === null) {
            var auxarr = [];
            auxarr.push(data)
            localStorage.setItem('favs', JSON.stringify(auxarr))
            setIsSelected(true)
        }else{
            var aux = JSON.parse(localStorage.getItem('favs'));
            var id_aux =  data.objectID;
            var chek = aux.find(c => c.objectID === id_aux);
            if (chek === undefined) {
                aux.push(data);
                localStorage.setItem('favs', JSON.stringify(aux));
                setIsSelected(true)
            } else {
                alert("Este artículo ya está en la sección de favoritos", chek.objectID)
            }
            
        }
    }
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
            setIsSelected(false)
        }
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
                        </span><br></br>
                        <span className='time'>
                            by: {article.author}
                        </span>
                        <br></br>
                        <span className='new-title'>{article.title}</span>
                    </div>
                    {!isSelected ? (
                    <button className="rectangle-fav" onClick={()=> setFav(article)}>
                        <img src="img/iconmonstr-favorite-2.svg"
                        className="iconmonstr-favorite-2" alt='fav'>
                        </img>
                    </button>
                    ) : (
                        
                        <button className="rectangle-fav" onClick={()=> unsetFav(article.objectID)}>
                            <img src="img/iconmonstr-favorite-3.svg"
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