namespace API.Errors
{
    public class APIMessageResponse
    {
        public APIMessageResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessage(statusCode);
        }

        private string GetDefaultMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request!",
                401 => "Authorized, You Are Not Have Permission At Here!",
                404 => "Not Found!",
                500 => "Internal Server Error!",
                _ => null
            };
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}