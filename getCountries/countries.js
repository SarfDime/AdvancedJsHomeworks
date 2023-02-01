const makeCall = async url => {
    try {
        const response = await fetch(url);
        // console.log(response.json())
        return await response.json();
    } catch (error) {
        console.log('The request failed!');
        return error
    }
}

const getCountries = async (code) => {
    const mainCountry = await makeCall(`https://restcountries.com/v3.1/alpha/${code}`)
    console.log("Country ", mainCountry[0])
    mainCountry[0].borders.forEach(async e => {
        let borderingCOuntry = await makeCall(`https://restcountries.com/v3.1/alpha/${e}`)
        console.log("Country : ", borderingCOuntry[0])

        // console.log("Country : ", await makeCall(`https://restcountries.com/v3.1/alpha/${e}`))
        // Zoshto ova ne se pokazhuva vo browser a raboti vo console ninja
        // https://prnt.sc/vu7uJOx5_5JW browser
        // https://prnt.sc/6HHu4FdQc8FP console ninja
    });
}

getCountries("mkd")