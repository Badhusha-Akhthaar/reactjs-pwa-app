import {Workbox} from 'workbox-window'

export function register(){
  if('production' !== process.env.NODE_ENV){
    return;
  }

  if('serviceWorker' in navigator){
    const wb = new Workbox('service-worker.js');

    wb.addEventListener('installed',(event)=>{
      if(event.isUpdate){
        // eslint-disable-next-line no-restricted-globals
        if(confirm("New version of app is available, please update!")){
          window.location.reload();
        }
      }
    })
    wb.register();
  }
}