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
  const [totalPages, setTotalPages] = useState(0)
  
  const handlePageChange = event => {
    setCurrentPage(event.selected);
  }

  useEffect(() =>{
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const {data} = await axios.get(
          "https://hn.algolia.com/api/v1/search?",
          {
            params: {page:currentPage},
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
  }, [currentPage])

  return (
    <div className="home-view">
      <div className="content">
        <Nav></Nav>
        {isLoading ? (
            <p>Loading...</p> 
          ) : (
              articles.map((article) => (
                  <NewsCard article={article} key={article.objectID}/>
              ))

          )}
      </div>
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
    
  );
}

export default App
