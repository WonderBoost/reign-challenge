import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPagination from "react-paginate";
import Nav from "./components/Nav";
import NewsCard from "./components/NewsCard"
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  
  const handlePageChange = event => {
    setCurrentPage(event.selected);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setCurrentPage(0);
    setQuery(searchInput);
    console.log(searchInput, 'buscador');
  }

  useEffect(() =>{
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const {data} = await axios.get(
          "https://hn.algolia.com/api/v1/search?",
          {
            params: {page:currentPage, query},
          }
        
        );
        const { hits, nbPages } = data;
        setArticles(hits);
        setTotalPages(nbPages)
      } catch (err) {
        console.log(err);
      }finally {
        setIsLoading(false)
      }

    };
    fetchData();
  }, [currentPage, query])

  return (
    <div className="home-view">
      <div className="content">
        <Nav></Nav>
        <form className="search-form" onChange={handleSubmit}>
        <select onChange={event => setSearchInput(event.target.value)}>
          <option value={''}>Select your news</option>
          <option value={'Angular'}>Angular</option>
          <option value={'React'}>React</option>
          <option value={'Vuejs'}>Vuejs</option>
        </select>
      </form>
        {isLoading ? (
            <p>Loading...</p> 
          ) : (
            
              articles.map((article) => (
                  <NewsCard article={article} key={article.objectID}/>
              ))

          )}
                <ReactPagination
        nextLabel=">"
        previousLabel="<"
        breakLabel="..."
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        className='pagination'
        activeClassName="active-page"
        previousClassName="previous-page"
        nextClassName="next-page"
      />
      </div>
    </div>
    
  );
}

export default App
