import { useState } from 'react';

const RoomPage = ({ setRoom, setIsAuth }) => {
  const [roomInput, setRoomInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // input değerini büyük harflere çevirerek setRoom ile ayarla
    setRoom(roomInput.toUpperCase());
  };

  const handleChange = (e) => {
    setRoomInput(e.target.value);
  };

  return (
    <form className="room-page" onSubmit={handleSubmit}>
      <h1>Sohbet Odası</h1>
      <p>Hangi Odaya Gireceksiniz?</p>
      <input
        placeholder="ör: Beyaz Oda"
        type="text"
        value={roomInput}
        onChange={handleChange}
        name="roomName" // name özelliği eklendi
      />
      <button type="submit">Odaya Gir</button>
      <button onClick={()=>{
        setIsAuth(false);
        localStorage.removeItem("TOKEN");
        }} type="button">Çıkış</button>
    </form>
  );
};

export default RoomPage;
