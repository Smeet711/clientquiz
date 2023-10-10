import { useState } from "react";
// import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  
const [doctorId, setdoctorId] = useState("")



  const fetchData = (value) => {
    console.log("fetching...");
    fetch("https://quizapi-omsn.onrender.com/api/get/docter/name")
      .then((response) => response.json())
      
      .then((json) => {
        const results = json.filter((user) => {
          console.log(user);
        //   console.log("user: " , user._id);
          setdoctorId(user._id)
          return (
            // value &&
            // user &&
            user._id && 
            user.doctorName &&
            user.doctorName.toLowerCase().includes(value)
          );
        });
        setResults(results);
      }).catch((error) => {
        console.error("Fetch error:", error);
        // Handle the error gracefully, e.g., show an error message to the user
      });;
  };

  const handleChange = (value) => {
    setInput(value);
    setSelectedResult(null);
    fetchData(value);
  };
  return (
    <div className="input-wrapper">
      {/* <FaSearch id="search-icon" /> */}
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {selectedResult && (
        <span className="selected-result" onClick={() => setInput("")}>
          {selectedResult}
        </span>
      )}
    </div>
  );
};