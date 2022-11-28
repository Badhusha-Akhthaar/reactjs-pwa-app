import axios from "axios";
import PouchDB from 'pouchdb-browser';


export async function initializeData() {
    let _configDB = new PouchDB("_config");
    let _didFetch = await _configDB.get("fetchConfig").then((data)=>{
                                return data;
                            })
                            .catch((err)=> console.log(err));

    if(!_didFetch){
        console.log("Didn't find data, fetching....")
        const BASE_URL = "https://salesorderrouter-dev.cfapps.us10.hana.ondemand.com/odata/"
        const ROOT_URL = axios.get(`${BASE_URL}ZTMDRIROOT_C`);
        const STOPITEM_URL = axios.get(`${BASE_URL}ZTMDRISTIT_C`);
        const STOP_URL = axios.get(`${BASE_URL}ZTMDRISTOP_C`);
        const ITEM_URL = axios.get(`${BASE_URL}ZTMDRIITEM_C`);
        const ENTITY_URLS  = [ROOT_URL,STOPITEM_URL,STOP_URL,ITEM_URL];
        let fetchStart = Date.now();
        console.log(`Fetch Start ${fetchStart}`)
        await axios
                .all(ENTITY_URLS)
                .then(axios.spread((...responses)=>{
                    let ENTITY_NAMES = ["ROOT","STOPITEM","STOP","ITEM"];
                    let _saveToIndexedDB = [];
                    responses.forEach((response,i)=>{
                        response.data.d.results.forEach(e => {
                            e._id = e.tor_id;
                            delete e.__metadata
                            return e
                        })
                        _saveToIndexedDB.push(writeToIndexedDB(response.data.d.results,ENTITY_NAMES[i]));
                    })
                    Promise.all(_saveToIndexedDB).then(()=>{
                        return true
                    })
                    .catch((err)=>{
                        console.log(`Error : ${err}`);
                        return false;
                    })
                }))
                .catch(errors =>{
                    console.log(`Error : ${errors}`)
                })
                .finally(()=>{
                    _configDB.put({"_id":"fetchConfig","didFetch":true})
                });
        let fetchEnd = Date.now();
        console.log(`Fetch Start ${fetchEnd}`)
        console.log(`Time taken ${fetchEnd-fetchStart}`)
    }
    else{
        _configDB.get("fetchConfig");
        console.log("Already data present. Skipped Fetching")
    }
}

function writeToIndexedDB(data,entityName){
    let _appData = new PouchDB(entityName);
    console.log(data);
    return new Promise((resolve,reject)=>{
        _appData.bulkDocs(data).then(()=>{
            resolve();
        })
        .catch((err)=>{
            reject(err);
        })
    });
}