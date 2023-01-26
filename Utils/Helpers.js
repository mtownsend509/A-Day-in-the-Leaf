module.exports = {

      // Format date as MM/DD/YYYY
      format_date: (date) => {
        return date.toLocaleDateString();
      },
    
      // Format large numbers with commas
      format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
      },
    
      // Format plural words
      format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
        return word;
      }
    
};   