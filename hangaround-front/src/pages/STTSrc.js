
//단어 확인 함수: 오픈사전 API를 사용하여 사전에 단어와 일치하는 단어가 있는지 확인 후 결과(Boolean)를 반환
async function checkWord(word) {
    console.log('checking word');

    const myConfig = {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    }

    let defaultURL = "https://cors-anywhere.herokuapp.com/http://opendict.korean.go.kr/api/search?";
    const key = "key=" + "3AEBFCE00275CF07019291B8639C7CF9";
    let part = "&part=word";
    let q = "&q=" + word;
    let sort = "&sort=dict";
    let fullURL = defaultURL + key + part + q + sort;

    let data = await axios.get(encodeURI(fullURL, {}, myConfig));

    //console.log(data.data);
    let n = data.data.indexOf(word);
    if (n === -1) {
        console.log('cannot find '+word);
        return false;
    } else {
        let text = data.data.substring(n, n + word.length);
        console.log('input word: ' + word + ', output word: ' + text + ' ,result: ' + (text === word));
        return (text === word);
    }
}


let cons = document.createElement('p');
document.querySelector('.words').appendChild(cons);
let speechText = document.createElement('p');
document.querySelector('.words').appendChild(speechText);
let resultText = document.createElement('p');
document.querySelector('.words').appendChild(resultText);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = 'ko-KR';


//초성 랜덤 생성
const consonant = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
    'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
    'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
let first = Math.floor(Math.random() * consonant.length);
let second = Math.floor(Math.random() * consonant.length);
while (true) {
    if (second !== first)
        break;
    else
        second = Math.floor(Math.random() * consonant.length);
}

cons.textContent = consonant[first] + consonant[second];
console.log(consonant[first] + consonant[second]);


recognition.start();

recognition.onstart = function () {};

recognition.onend = function () {
    recognition.start();
};


recognition.onresult = async function (e) {
    let texts = Array.from(e.results)
        .map(results => results[0].transcript).join("");

    speechText.textContent = texts;

    try{
        //초성 일치하는지 확인하기 위해 단어로부터 초성을 분리
        let kor1 = texts[0];
        let uni1 = kor1.charCodeAt(0);
        uni1 = uni1 - 44032;
        let fn1 = parseInt(uni1 / 588);

        let kor2 = texts[1];
        let uni2 = kor2.charCodeAt(0);
        uni2 = uni2 - 44032;
        let fn2 = parseInt(uni2 / 588);

        //랜덤 초성과 단어의 초성이 일치하는지 확인, 단어 확인 함수를 통해 사전에 있는 단어인지 확인
        if ((consonant[first] === f[fn1]) && (consonant[second] === f[fn2]) && (await checkWord(texts.substring(0, 2)))) {
            resultText.textContent = "정답!";
        } else {
            resultText.textContent = "땡!"
        }

        console.log(texts);
    } catch (e) {
        console.log("두글자 이상 입력되지 않음");
    }
};
