

import React, {useState, useEffect} from 'react'

const Users = () => {

    const[myUsers, setMyUsers] = useState();
    const[myUsersData, setMyUsersData] = useState([]);

    const fetchUsersData = () => {

        let urlTxt = "http://norvig.com/big.txt";
        let urlJs = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";

        fetch(urlTxt)
        .then((response) => {
            console.log(response);
            return response.text();
        })
        .then(async (result) => {
            console.log(result);
            setMyUsers(result);

         const response = await fetch(urlJs);
            const data = await response.json();
            console.log(data);
            setMyUsersData(data);

        });
    }

    //count the word in document
   var wordCount = myUsers.match(/(\w+)/g).length;

   // Find synonyms/means in the JSON 
    const findDuplicateWords = myUsersData => {
        const strArr = myUsersData.split(" ");
        const res = [];
        for(let i = 0; i < strArr.length; i++){
            if(strArr.indexOf(strArr[i]) !== strArr.lastIndexOf(strArr[i])){
                if(!res.includes(strArr[i])){
                    res.push(strArr[i]);
                };
            };
        };
        return res.join(" ");
        };
     console.log(findDuplicateWords(myUsersData));

     // top 10 words 'text'
     let topTenWords = myUsersData.map((topTen) => {
         let top = topTen.match("text").length;
         let i;
         let result = 0;
         for(i = 0; top < 10; i++)
         {
           return result += top[i];
         }
     })


// use effect
    useEffect(() => {
       fetchUsersData();
       document.title = "Getting Data from fetch API"
    },[]);

  return (
        <div className="row txt-sm bdr-btm g-0">
            <div> Total word count in text file: { wordCount }</div>
            <div> Find synonyms: { findDuplicateWords }</div>
            <div> Find Top Ten: { topTenWords }</div>
             
        </div>
  );
}

export default Users;
