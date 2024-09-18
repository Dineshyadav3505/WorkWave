export default function isNewUpdate(dateString) {
    const today = new Date();
    const lastDate = new Date(dateString);
    
    // Normalize both dates to remove time part for accurate day comparison
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const lastDateNormalized = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    
    // Calculate the difference in time
    const diffTime = lastDateNormalized - todayNormalized; // No need for Math.abs here
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days
    
    if (diffDays < 0) {
        return false; 
    } else if (diffDays === 0) {
        return true; 
    } else {
        return true; 
    }
}

export function removeSpace(str) {
    return str.replace(/\s/g, "-");
}
