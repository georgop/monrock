export const formatDuration = (seconds:number) => {
    // Round up the duration to the nearest whole second
    const roundedSeconds = Math.ceil(seconds);
  
    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const secs = roundedSeconds % 60;
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
    
export const calculateAdSpaces = (seconds:number) => {
    return Math.ceil(seconds / 20);
};