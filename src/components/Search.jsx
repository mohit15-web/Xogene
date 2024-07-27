import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Search() {
  const [name, setName] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate()
  const fetchData = async (name) => {
    console.log(name);
    let res = await fetch(
      `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${name}`
    );
    let data = await res.json();
    return data;
  };

  useEffect(() => {
      fetchData(name)
      .then((res) => {
          setIsLoading(true);
        console.log(res.drugGroup.conceptGroup[1]?.conceptProperties);
        // setUrl(res)
        setDrugs(res.drugGroup.conceptGroup[1].conceptProperties);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [name]);

  console.log(drugs);
  return (
    <div>
      <div className=" text-2xl bg-gray-400 flex gap-96 py-4 px-4 font-bold tracking-wider">
        <h1>Xogene Logo</h1>
        <h1>Search Drugs</h1>
      </div>
      <div className="flex justify-center items-center gap-4 flex-col mt-20">
        <h1 className=" text-2xl font-bold my-4">Search for Drugs!</h1>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-gray-400 rounded-md w-80"
            placeholder="search drugs"
          />
        </div>
        <div>
          {isLoading ? (
            <ClipLoader />
          ) : (
            drugs?.map((item, index) => (
              <h1 key={index} className="bg-gray-300 my-1 w-80 p-2 rounded-md cursor-pointer"
              onClick={() => {
                    navigate(`drugs/${item.rxcui}`)
              }}
              >
                {item.name}{" "}
              </h1>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
