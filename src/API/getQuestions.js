import axios from "axios";
/* Session Tokens are unique keys that will help keep track of the questions the API has already retrieved. By appending a Session Token to a API 
* Call, the API will never give you the same question twice. Over the lifespan of a Session Token, 
* there will eventually reach a point where you have exhausted all the possible questions in the 
* database. At this point, the API will respond with the approperate "Response Code". From here,
* you can either "Reset" the Token, which will wipe all past memory, or you can ask for a new one. 
* if its inactive for 6 hours
* In most cases the API didn't have enough questions to use token so i won't be using it.
*/
// async function fetchToken() {
//   const storedToken = JSON.parse(localStorage.getItem("token")); // Check LocalStorage for stored token
//   const lastFetchedTokenTime = storedToken ? storedToken.timestamp : 0; // Default to 0 if no stored token else set timestamp
//   const storedTokenID = storedToken ? storedToken.tokenID : null; // Default to null else store ther token for rest use with API
//   if (!lastFetchedTokenTime) {
//     try {
//       const response = await axios.get(
//         "https://opentdb.com/api_token.php?command=request"
//       );
//       const token = response.data.token;
//       const storeToken = {
//         tokenID: token,
//         timestamp: Date.now(),
//       };
//       localStorage.setItem("token", JSON.stringify(storeToken));
//       return token;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   } else if (Date.now() - lastFetchedTokenTime > 6 * 60 * 60 * 1000) {
//     try {
//       const response = await axios.get(
//         `https://opentdb.com/api_token.php?command=reset&token=${storedTokenID}`
//       );
//       const token = response.data.token;
//       console.log(response.data.response_code);
//       const tokenResetTime = {
//         tokenID: token,
//         timestamp: Date.now(),
//       };
//       localStorage.setItem("token", JSON.stringify(tokenResetTime));
//       return token;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// }

export async function getQuestions({amount, category, difficulty, type}) {
  const questions = [];
  try {
    // const token = await fetchToken();
    const url = `https://opentdb.com/api.php?amount=${amount}${category ? "&category=" + category : ""}${difficulty ? "&difficulty=" + difficulty : ""}${type ? "&type=" + type : ""}`;
    const response = await axios.get(url);
    const results = response.data.results;
    // response.data.response_code === 4 ? 
    // alert("Not enough questions with these parameters") : null;
    for (let question of results) {
      questions.push(question);
    }
    return questions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const windowEvent = window.addEventListener('beforeunload', e => {
  // e.preventDefault();
  localStorage.clear();
})