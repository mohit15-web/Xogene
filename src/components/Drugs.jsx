import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Drugs() {
  const [data, setData] = useState({});
  const { id } = useParams();
  console.log(id);
  const fetchData = async () => {
    let res = await fetch(
      `https://rxnav.nlm.nih.gov/REST/rxcui/${id}/properties.json`
    );
    let data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchData()
      .then((res) => {
        console.log(res.properties);
        // setUrl(res)
        setData(res.properties);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div className=" text-2xl bg-gray-400 flex gap-96 py-4 px-4  font-bold tracking-wider">
        <h1>Xogene Logo</h1>
        <h1>Search Details</h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-20 ">
        <h1 className=" text-2xl font-bold my-4">Details of Drug</h1>
        <h1 className="bg-gray-300 my-1 w-96 p-2 rounded-md cursor-pointer">
          <span className="font-bold pr-1">Id</span>: {data.rxcui}{" "}
        </h1>
        <h1 className="bg-gray-300 my-1 w-96 p-2 rounded-md cursor-pointer">
        <span className="font-bold pr-1">Name</span> :{data.name}{" "}
        </h1>
        <h1 className="bg-gray-300 my-1 w-96 p-2 rounded-md cursor-pointer">
        <span className="font-bold pr-1">Synonym</span> : {data.synonym}{" "}
        </h1>
      </div>
      <div />
    </div>
  );
}

export default Drugs;
