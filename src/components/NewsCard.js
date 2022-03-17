import React from 'react'

function NewsCard({article, active, handleChangeActive}) {
    const [toggled, setToggled] = React.useState(true);
    const toggleImage = () => setToggled(!toggled);
    if (!article.title) return null;
    return (
        <div className='content-all'>
            <div className='rectangle-news'>
                <div>
                    <div className='section-info'>
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
                    
                    <div className="rectangle-fav">
                            <img onClick={toggleImage} src="img/iconmonstr-favorite-2.svg"
                            className="iconmonstr-favorite-2" alt='fav'>
                            </img>
                    </div>
                </div>
            </div>
        </div>

             
    )
}

export default NewsCard