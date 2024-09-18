export const dataVerification = (date, isNewUpdate) => {
    // Check if date is a string and convert it to a Date object
    let specificDate;
    if (typeof date === 'string') {
        specificDate = new Date(date);
    } else if (date instanceof Date) {
        specificDate = date;
    } else {
        console.error("Invalid date provided:", date);
        return;
    }

    // Check if the specific date is valid
    if (isNaN(specificDate.getTime())) {
        console.error("Invalid date provided:", specificDate);
        return;
    }

    console.log("Specific Date:", specificDate);
    
    const today = new Date();
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const specificDateNormalized = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate());
  
    // Compare the two dates
    if (todayNormalized.getTime() === specificDateNormalized.getTime()) {
        isNewUpdate(); 
        
    } else {
        console.log("Today's date is not equal to the specific date.");
    }
};