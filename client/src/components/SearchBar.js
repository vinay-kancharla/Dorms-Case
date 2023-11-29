import React, {useState, useEffect} from 'react'
import dorms from "../dummy_data/alldorms.json";
import { Link } from "react-router-dom";
import "./components.css"
const SearchBar = (props) => {
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

     useEffect(() => {
          async function getDorms(experience) {
            try {
              const response = await fetch(
                `http://localhost:8080/api/dorm/getAll?experience=${experience}`
              );

              const data = await response.json();
              return data
            } catch (error) {
              console.log("Error: ", error);
            }
          }
          let res = []
          for(let i = 0; i < experiences.length; i++){
              res.push(getDorms(experiences[i]))
          }
        }, []);

    const updatingSearchResults = (event) => {
        
        console.log("entries" + entries)
        const predicate = event.target.value
        setSearch(predicate)

        if(predicate.length > 0){
          setShowList(true)
          console.log(showList)

          const filteredResults = entries.filter(entry => entry.toLowerCase().includes(predicate.toLowerCase()))
          .sort((first, second) => {
            // Check if both start with the predicate, or neither does
            const doesFirstStartWithPred = first.toLowerCase().startsWith(predicate.toLowerCase());
            const doesSecondStartWithPred = second.toLowerCase().startsWith(predicate.toLowerCase());
            if (doesFirstStartWithPred === doesSecondStartWithPred) {
              return 0; // If both start with the predicate or neither, leave their order unchanged
            }
            return doesFirstStartWithPred ? -1 : 1; // Otherwise, sort so that startsWithPredicateA comes first
          })
          .slice(0, 5);
              setFilteredDorms(filteredResults);
          } else {
              setShowList(false)
              setFilteredDorms([]);
          }
        }

    

      return (
        <div className="search-box-container">
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
                    <div key={index}>
                        <Link onClick={() => props.callback({action: 'clicked'})} to={`/dorm/${dorm}`}>{dorm}</Link>
                    </div>
                ))}
            </ul>
          </div>
          }


        </div>
      );

}

export default SearchBar;