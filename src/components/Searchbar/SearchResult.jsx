import { useNavigate } from "react-router-dom";
import "./SearchResult.css";


export const SearchResult = ({ result , onClick,ID}) => {

    const navigate = useNavigate()

    const gotocat = ()=>{
        // alert(`You selected ${result}!`)
        // alert(`You selected ${ID}!`)
       
        navigate(`/cat/${ID}`)

    }


  return (
    <div
      className="search-result"
      onClick={gotocat}

    >
      {result}
    </div>
  );
};
