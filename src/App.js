import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPagination from "react-paginate";
import Nav from "./components/Nav";
import NewsCard from "./components/NewsCard"
import "./App.css";
import Select from 'react-select'

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const options = [
    {
      value: "Angular",
      label: (
        <div>
          <img alt="" src={require('./img/image-138.png')}/>{' '}
          <label>Angular</label>
        </div>
      )
    },
    {
      value: "React",
      label: (
        <div>
          <img alt="" src={require('./img/image-140.png')}/>{' '}
          <label>React</label>
        </div>
      )
    },
    {
      value: "VueJs",
      label: (
        <div>
          <img alt="" src={require('./img/image-141.png')}/>{' '}
          <label>VueJs</label>
        </div>
      )
    }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid transparent',
      color: 'black',
      padding: 20,
      textAlign: 'left',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      textAlignLast: 'left'
    }),
    container: (provided, state) => ({
      ...provided,
      width: '300px'
    }),
  }

  
  const handlePageChange = event => {
    setCurrentPage(event.selected);
  }

  const querySelect = (data) => {
    setCurrentPage(0);
    setQuery(data.value);
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
        <div className="filter-component">
          <li>All</li>
          <li>My Faves</li>
        </div>
        <div className="container-select">
          <div className='content-select'>
            <Select placeholder='Select your news' options={options} styles={customStyles} onChange={querySelect} />
          </div>
        </div>


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
        breakLabel={'...'}
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        className='pagination'
        activeClassName={"active-page"}
        previousClassName="previous-page"
        nextClassName="next-page"
      />
      </div>

      </div>
    
  );
}

export default App
