class Response{
    error(location, error_kind, msg, error_code){
        return {
          "error": "true",
          "location": `${location}`,
          "error_kind" : `${error_kind}`,
          "message": `${msg}`,
          "error_code": `${error_code}`,
          };
    }
    login_success(token, msg, error_code){
      return {
        "token": `${token}`,
        "error": "false",
        "message": `${msg}`,
        "error_code": `${error_code}`
        };
    }
    success(location, msg, error_code){
      return {
        "error": "false",
        "location": `${location}`,
        "message": `${msg}`,
        "error_code": `${error_code}`
        };
    }
    success_getdata(location, msg, error_code, data){
      return {
        "error": "false",
        "location": `${location}`,
        "message": `${msg}`,
        "error_code": `${error_code}`,
        "data": data
        };
    }
}

module.exports = new Response;