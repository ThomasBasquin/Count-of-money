import { useEffect, useState } from "react";
import Header from "../../../components/header";
import axios from "axios";
import Articles from "../../../components/articles";




const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function getArticles() {
            const response = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcoinacademy.fr%2Factu%2Fgn').then((res) => {
                console.log(res);
                console.log(res.data.items)
                setArticles(res.data.items);
            }).catch((err) => {
                console.log(err);
            });
        }
        getArticles();
    }, [])

    return (
        <div className='flex flex-col w-screen h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900'>
            <Header />
            <div className="rounded-lg border h-fit p-4 m-2 flex flex-col bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 overflow-y-auto">
                <Articles />
            </div>
        </div>
    )
}

export default ArticlesPage;