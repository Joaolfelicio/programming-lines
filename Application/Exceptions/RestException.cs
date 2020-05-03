using System;
using System.Net;

namespace Application.Exceptions
{

    public class RestException : Exception
    {
        public HttpStatusCode Code;
        public object Errors;
        public RestException(HttpStatusCode code, object errors = null)
        {
            Errors = errors;
            Code = code;
        }
    }

}