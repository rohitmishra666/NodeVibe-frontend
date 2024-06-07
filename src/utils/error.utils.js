// utils/errorUtils.js
const parseHtmlError = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const preElement = doc.querySelector('pre');
    
    if (preElement) {
      const errorMessage = preElement.textContent;
      const startIndex = errorMessage.indexOf('Error: ') + 7; // 7 is the length of 'Error: '
      const endIndex = errorMessage.indexOf('!');
      if (startIndex > -1 && endIndex > -1) {
        return errorMessage.slice(startIndex, endIndex).trim();
      }
    }
    return "An unexpected error occurred";
  };
  
  const handleHtmlError = (error) => {
    if (error?.response?.data) {

      const contentType = error.response.headers['content-type'];

      if (contentType && contentType.includes('text/html')) {
        return parseHtmlError(error.response.data);
      }

      return error.message || "An unexpected error occurred";
    }
    return "An unexpected error occurred";
  };
  
  export { handleHtmlError };
  