import axios from "axios";

async function fetchCategories(){
    try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        const catergories = response.data.trivia_categories;
        return catergories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function loadCategories(){
    try {
        const response = await fetchCategories();
        const catergories = response;
        return catergories;
    } catch (error) {
        console.log(error)
    }
}