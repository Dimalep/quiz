export default function useConvertGameStatus() {

  const statusToString = (value: number) : string => {
    let result = "";
    switch(value){
      case 0: result = "opened"; break;
      case 1: result = "closed"; break;
      case 2: result = "launched"; break;
      case 3: result = "completed"; break;
    }
    return result;
  };

  const statusToNumber = (value: string) : number => {
    let result = 0;
    switch(value){
      case "opened": result = 0; break;
      case "closed": result = 1; break;
      case "launched": result = 2; break;
      case "completed": result = 3; break;
    }
    return result;
  };

  return {statusToString, statusToNumber}
}
