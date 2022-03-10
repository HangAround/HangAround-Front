import MainLogo from '../statics/images/MainLogo.png';
import '../App.css';

export default function Main() {
  return (
    <div className="main">
      <header className="App-header">
      <div className="mainLoginButton">
        <div>
          WITHOUT LOGIN
        </div>
        <div>
          OR
        </div>
        <div>
          KAKAO LOGIN
        </div>
      </div>
        <img src={MainLogo} alt="logo" />
      </header>
    </div>
  );
}
