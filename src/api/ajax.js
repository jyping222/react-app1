import Axios from 'axios'
export default function ajax(url,data,method="POST"){
    if(method==="POST"){
        console.log('POSY、url,data',url,Axios.post(url,data),data)
       return Axios.post(url,data)
    }else{
        console.log('data-000',data)

        if(data){
            let tempData=''
            Object.keys(data).forEach(key=>{
                console.log('-key',key)

            tempData=key+'='+data[key]+'&'
            console.log('-tempData',tempData)
        } )
         console.log('-tempData',tempData)

        url+='?'+tempData.substring(0,tempData.length-1)

        }
        
        
         console.log('访问get方式url拼接',url)
        return Axios.get(url)
    }
}