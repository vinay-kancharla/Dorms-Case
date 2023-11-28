import React, {useState, useEffect} from 'react'
import dorms from "../dummy_data/alldorms.json";
import { Link } from "react-router-dom";
import "./components.css"
const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [entries, setEntries] = useState([])
    const [filteredDorms, setFilteredDorms]  = useState([])
    const [showList, setShowList] = useState(false)
    const experiences = ["FIRST_YEAR", "SECOND_YEAR", "UPPER_CLASS"]

    useEffect(() => {
        // Fetch the dorms data from the backend
        // const fetchDorms = async () => {
        //   try {
        //     		const response = await fetch(
					// `http://localhost:8080/api/review/getAll`
                    // );
        //     const data = await response.json();
        //     setDorms(data);
        //   } catch (error) {
        //     console.error('Error fetching dorm data:', error);
        //   }
        setEntries(dorms.AllDorms)
        
        }, []);

    // useEffect(() => {
    //     const results = entries.filter(entry => entry.toLowerCase().includes(search.toLowerCase()))
    //     setFilteredDorms(results)
    // }, []);

    const updatingSearchResults = (event) => {
        
        console.log("entries" + entries)
        const predicate = event.target.value
        setSearch(predicate)

        if(predicate.length > 0){
          setShowList(true)
          console.log(showList)
          const filteredResults = entries.filter(dorm => 
            dorm.toLowerCase().includes(predicate.toLowerCase())
              ).slice(0, 4);
              setFilteredDorms(filteredResults);
          } else {
              setShowList(false)
              setFilteredDorms([]);
          }
        }

    

      return (
        <div className="search-box-container"  style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search dorms..."
            value={search}
            className="custom-nav-item search-input"
            onChange={updatingSearchResults}
          />
          { showList && 
          <div className='navbar-search-results'>
          <ul>
                {filteredDorms.map((dorm, index) => (
                    <li key={index}>
                        <Link to={`/dorm/${dorm}`}>{dorm}</Link>
                    </li>
                ))}
            </ul>
          </div>
          }


        </div>
      );

}

export default SearchBar;