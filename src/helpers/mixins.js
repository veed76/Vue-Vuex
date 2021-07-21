export default {
    perPage(){
        return process.env.PAGINATE_LIMIT ? process.env.PAGINATE_LIMIT : 25;
    },
    redirectUrl(url){
        window.location = url;
    }
};
