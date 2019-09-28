export default function getRedirectPath(type,header){
    let path=''
    path+=type
    if(!header){
       return path+='info'
    }
    return path
}