//import {checkWord} from "./check.js";

// let p = null;
//
// let makeNewTextContent = function () {
//     p = document.createElement('p');
//     document.querySelector('.words').appendChild(p);
// };

let cons = document.createElement('p');
document.querySelector('.words').appendChild(cons);
let speechText = document.createElement('p');
document.querySelector('.words').appendChild(speechText);
let resultText = document.createElement('p');
document.querySelector('.words').appendChild(resultText);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
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

//makeNewTextContent(); // 초성을 출력하기 전에 새로운 문단을 추가한다.

cons.textContent = consonant[first] + consonant[second];
console.log(consonant[first] + consonant[second]);


recognition.start();

recognition.onstart = function () {
    // makeNewTextContent(); // 음성 인식 시작시마다 새로운 문단을 추가한다.
};
recognition.onend = function () {
    recognition.start();
};



recognition.onresult = async function (e) {
    let texts = Array.from(e.results)
        .map(results => results[0].transcript).join("");

    speechText.textContent = texts;

    //초성 일치하는지 확인
    let kor1 = texts[0];
    let uni1 = kor1.charCodeAt(0);
    uni1 = uni1 - 44032;
    let fn1 = parseInt(uni1 / 588);

    let kor2 = texts[1];
    let uni2 = kor2.charCodeAt(0);
    uni2 = uni2 - 44032;
    let fn2 = parseInt(uni2 / 588);

    //1번 문제
    // makeNewTextContent();


    //2번 문제
     //if ((consonant[first] === f[fn1]) && (consonant[second] === f[fn2]) && ( await checkWord(texts.substring(0, 2))===true)) {
    if ((consonant[first] === f[fn1]) && (consonant[second] === f[fn2])) {
        resultText.textContent = "정답!";
    } else {
        resultText.textContent = "땡!"
    }

    console.log(texts);
};

