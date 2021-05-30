class Response{
    error(errorObj){
        return {
          "location": `${errorObj.location}`,
          "message": `${errorObj.message}`,
          "error_code": `${errorObj.error_code}`,
          };
    }
    success(successObj, data){
      return {
        "location": `${successObj.location}`,
        "message": `${successObj.message}`,
        "error_code": `${successObj.error_code}`,
        "data": data
        };
    }
}

module.exports = new Response;