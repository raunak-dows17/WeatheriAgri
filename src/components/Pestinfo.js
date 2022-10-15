// import React, { useState } from "react";

// const Pestinfo = () => {
//   const [dataset, setDataset] = useState([]);
//   const url =
//     "https://agrofit-data.p.rapidapi.com/ProdutoFormulado/FindByCrop?page=1";

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "0e53b08b57mshdfd0a70adc8f527p11efa5jsn1e524751e79d",
//       "X-RapidAPI-Host": "agrofit-data.p.rapidapi.com",
//     },
//   };

//   const Info = async () => {
//     const data = await (await fetch(url, options))
//       .json()
//       .catch((err) => console.error("error:" + err));
//     console.log(data);
//     setDataset(data);
//   };
//   return (
//     <div>
//       <p>{}</p>
//     </div>
//   );
// };

// export default Pestinfo;
