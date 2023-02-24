const makeCall = async url => {
    try {
        const response = await fetch(url);
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
    });
}
