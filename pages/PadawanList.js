import React from 'react'
import {useState, useEffect} from "react"
import Player from "./components/player";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { GetPadawans, GetPadawansTest, GetPFP } from '../FirebaseUtils';
import BetterPlayer from './components/BetterPlayer';
const dbRef = ref(getDatabase());
const db = getDatabase();

const getName = ref(db, 'padawans/' + 1 + '/name');

// onValue(getName, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data +"yooo");
// });





/*
  sortby: name 
  includeEvents: string[]
*/

const PadawanList = (props) => {
  const [data, setData] = useState();
  const { sortby, includeEvents } = props
  useEffect(() => {
    GetPadawansTest()
      .then(d => setData(d))
      .catch(err => console.log(err))
  }, [])

  
    let cards = []
    if (data) {
        let PadawanKeys = Object.keys(data)

        if (includeEvents !== undefined) {
          PadawanKeys.filter((index) => {
            const event = data[index].event
            return includeEvents.includes(event)
          })
        }
        
        if (sortby && sortby.toLowerCase() == "name") {
          console.log("Sorting: ", PadawanKeys)
          PadawanKeys.sort((a, b) => {
            const nameA = data[a].name.toLowerCase()
            const nameB = data[b].name.toLowerCase()
            console.log(nameA, nameB)
            if (nameA > nameB) return 1
            return -1
          })
          console.log("Sorted: ", PadawanKeys)
        }

        
        cards = PadawanKeys.map(index => {
        const PadawanData = data[index]
        const {name, URL, address, about, skills, timezone, twitter} = PadawanData
        return (
          <span key={index}>
              <Player name={name} pfp={URL} bg={"/banner.png"} />
              {/* <BetterPlayer {...PadawanData} /> */}

          </span>
        )
        })
  }

  return cards
}

export default PadawanList