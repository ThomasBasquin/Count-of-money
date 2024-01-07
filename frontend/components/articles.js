import { useEffect, useState } from "react";
import axios from "axios";




const Articles = () => {
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
        <>
            {articles.map((article, index) => (
                <div key={index} className="rounded-lg border h-fit p-4 m-2 flex flex-col bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700">
                    <h1 className="text-2xl font-bold text-white">{article.title}</h1>
                    <p className="text-xl text-white">{article.description}</p>
                    <a href={article.link} target="_blank" className="text-blue-500 text-xl">Lire la suite</a>
                </div>
            ))}
            <p className="text-white">© Provided by CoinAcademy</p>
        </>
    )
}

export default Articles;