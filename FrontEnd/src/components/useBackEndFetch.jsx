import { useState } from 'react';

const useBackEndFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const sendRequest = async (endpoint, args) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        // /ChoicesPersonal のリクエストの場合、ダミーデータを返す
        if (endpoint === '/ChoicesPersonal') {
            setTimeout(() => { // ネットワークリクエストの遅延をシミュレート
                try {
                    // ダミーデータ
                    const dummyData = {
                        message: "セラミドとトラネキサム酸　※実際の結果とは異なります。",
                        // ダミーの詳細データなど
                    };
                    console.log(args)
                    setData(dummyData);
                    setIsLoading(false);
                } catch (error) {
                    setError("Error during data fetch: " + error.message);
                    setIsLoading(false);
                }
            }, 1000); // 1秒後にダミーデータをセット
            return;
        }

        // if (endpoint === '/ChoicesFeedback') {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => { // ネットワークリクエストの遅延をシミュレート
        //             try {
        //                 // ダミーデータ
        //                 const dummyData = {
        //                     success: true,
        //                     message: "Your choices have been recorded successfully!",
        //                     // ダミーの詳細データなど
        //                 };
        //                 console.log(args);
        //                 // 成功した応答を返す
        //                 resolve(dummyData);
        //             } catch (error) {
        //                 // エラーを投げてPromiseを拒否
        //                 reject(new Error("Error during data fetch: " + error.message));
        //             }
        //         }, 1000); // 1秒後に応答
        //     });
        // }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error("Oops, we haven't got JSON!");
            }

            const responseData = await response.json();

            if (responseData.error) {
                throw new Error('Error from server: ' + responseData.error);
            } else {
                setData(responseData); // Assuming setData updates your state with the response data
                return responseData;
            }
        } catch (error) {
            setError("Error during data fetch: " + error.message); // Assuming setError updates your state to show an error message
            console.error("Error during data fetch:", error);
        } finally {
            setIsLoading(false); // Assuming setIsLoading updates your state to show loading is complete
        }
    }

    return { sendRequest, isLoading, error, data };
};

    export default useBackEndFetch;
