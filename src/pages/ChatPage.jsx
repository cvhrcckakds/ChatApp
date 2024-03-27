import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  //mesaj gönderilince
  const handleSubmit = async (e) => {
    e.preventDefault();

    //koleksiyonun referansını alma
    const messagesCol = collection(db, "Messages");


    //koleksiyona yeni döküman ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        name: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(), //veri tabanın zamanını alır new date yapmama sebebimiz pcnin tarihi değiştirerek mesajlar arasında karışıklığa sebep olabilir
    });

    //formu sıfırla
    e.target.reset();
  };

  //VERİ TABANINA EKLENEN MESAJLARI ANLIK OLARAK GETİR
  useEffect(() => {
    //koleksiyonun referansını alma
    const messagesCol = collection(db, "Messages");

    // filtreleme ayarları yap
    const q = query(
        messagesCol,
        where('room', '==', room),
        orderBy('createdAt', 'asc')
      );

    //onSnapshot anlık olarak koleksiyondaki değişimleri izler, koleksiyon her değiştiğinde verdiğimiz fonksiyona koleksiyondaki dökümanları parametre olarak gönderir
    onSnapshot(q, (snapshot) => {
      //verilerin geçici olarak tutulduğu dizi
      const tepmMsg = [];

      //dökümanları dön, verilerine eriş, diziye aktar
      snapshot.docs.forEach((doc) => {
        tepmMsg.push(doc.data());
      });

      //Mesajları state aktar
      setMessages(tepmMsg);
    });
  }, []);
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.map((data, i) => (
          <Message key={i} data={data} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Mesajınızı yazınız..." type="text" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
