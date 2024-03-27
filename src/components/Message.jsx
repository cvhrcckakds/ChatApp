import { auth } from "../firebase/config"

const Message = ({data}) => {

    //mesajı atan ile oturum açanın id'si eşleşirse
    if (auth.currentUser?.uid === data.author.id){
return <p className="msg-user">{data.text}</p>
    }

    //id eşleşmezse
    return (
    <div className="msg-other">
      <p className="user-info">
        <img src={data.author.photo} alt="profile" />
        <span>{data.author.name}</span>
      </p>
      <p className="msg-text">{data.text}</p>
    </div>
  )

  
}



export default Message
