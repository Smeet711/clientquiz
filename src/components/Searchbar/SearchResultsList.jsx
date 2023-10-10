import "./SearchResultsList.css";
import { SearchResult } from './SearchResult'

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={"Dr. "+result.doctorName}
            ID={result._id}

            key={id}
          />
        );
      })}
    </div>
  );
};