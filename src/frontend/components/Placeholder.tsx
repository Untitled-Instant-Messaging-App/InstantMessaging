import Safe from "../assets/Safe";
import Rocket from "../assets/Rocket";
import Phone from "../assets/Phone";

export default function Placeholder() {
  return (
    <div className="hello-there">
      <div>
        <Safe />
        <h1>Secure</h1>
        <p>E2E encrypted messages using the Signal Protocol</p>
      </div>
      <div>
        <Rocket />
        <h1>Fast</h1>
        <p>Using fast and decentralized XMPP communication</p>
      </div>
      <div>
        <Phone />
        <h1>Intuitive</h1>
        <p>Familar design language we all expect for messaging</p>
      </div>
    </div>
  );
}
