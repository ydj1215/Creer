import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChatAxiosApi } from "../../api/chat/ChatAxiosApi";
import { KH_SOCKET_URL } from "../../utils/Common";

const ChatContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.div`
  font-size: 1.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.$isSender ? "#DCF8C6" : "#E0E0E0")};
  align-self: ${(props) => (props.$isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.$isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;

const Input = styled.input`
  padding: 10px;
  width: 70%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const CloseButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const Chatting = () => {
  const [socketConnected, setSocketConnected] = useState(false); // 채팅방, 즉 웹소켓에 접속했는가?
  const [inputMsg, setInputMsg] = useState("");
  const [chatList, setChatList] = useState([]);
  const { roomId } = useParams(); // URL에서 동적 세그먼트의 값을 추출
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const sender = window.localStorage.getItem("NickName");
  const ws = useRef(null);
  /*
  useState()는 컴포넌트의 상태를 관리하고, 상태가 바뀔때마다 컴포넌트를 리렌더링 한다.
  useEffect()는 렌더링이 일어난 이후에 추가적인 작업을 할 수 가 있다.
  useRef()는 해당 값이 변경되어도 컴포넌트가 리렌더링되지 않도록 할 때 사용한다.
  즉, 렌더링이 일어나더라도 그 값이 유지된다.
  또한, 해당 객체의 값이 변경되더라도 컴포넌트가 렌더링 되지는 않는다.
  고로 useRef()는 렌더링 사이클에 영향을 주지 않는 값을 관리하는데 사용된다.
  */

  // Q. 왜 ws, 웹 소켓 객체를 useState()가 아닌 useRef() 객체로 선언했을까?
  // A. ws를 useState()로 선언했다면, 하단의 useEffect() 문에서 의존성 배열에서 ws가 아닌 다른 값들이 들어가 있기 때문에, 그 값들이 바뀔때마다 ws 객체가 새롭게 생성될 것이다. 계속 동일한 웹 소켓 객체를 사용하기 위해서는 useRef() 객체를 사용해야 한다.

  // 입력 필드, 즉 메시지의 내용을 감지
  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  // Enter 키의 입력을 감지
  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault(); // 이벤트의 기본 동작을 취소
      onClickMsgSend(e);
    }
  };

  // 서버에게 메시지를 전송
  const onClickMsgSend = (e) => {
    ws.current.send(
      // current : useRef 훅을 통해 생성된 ref 객체의 property로,
      // 이를 통해 해당 객체에 접근이 가능
      JSON.stringify({
        type: "TALK",
        name: roomName,
        sender: sender,
        message: inputMsg,
      })
    );
    // 입력 필드 비우기
    setInputMsg("");
  };

  // 서버에게 채팅방을 나갔다는 것을 알리고,
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        name: roomName,
        sender: sender,
        message: "종료 합니다.",
      })
    );
    // 웹소켓 연결을 닫는다.
    ws.current.close();
    // 그 후, 채팅 목록 페이지로 이동
    navigate("/ChatList");
  };

  // ==================== 렌더링 이후 가장 먼저 실행되는 useEffect() ====================
  useEffect(() => {
    const fetchRoomName = async () => {
      try {
        const res = await ChatAxiosApi.chatInfo(roomId);
        console.log(res);
        // setRoomName(resRoomName);
      } catch (error) {
        console.error(
          "채팅방 아이디를 통해 채팅방 이름을 가져오는 데 실패했습니다.",
          error
        );
      }
    };

    fetchRoomName();
    console.log("방 이름 : " + roomName);

    if (!ws.current) {
      // 새로운 웹소켓 객체를 생성하고, ws.current에 할당
      ws.current = new WebSocket(KH_SOCKET_URL);

      // 지정해 놓은 웹소켓 서버로 연결을 시도
      ws.current.onopen = () => {
        // 연결이 성공적으로 이루어졌다면,
        console.log("Successfully connected to " + KH_SOCKET_URL);
        setSocketConnected(true);
      };
    }

    // 이전 채팅 로그 불러오기
    const fetchPreviousMessages = async () => {
      try {
        const response = await ChatAxiosApi.chatLoad(roomId);
        // chatList를 업데이트
        setChatList(response.data);
      } catch (error) {
        console.error("이전 메시지를 불러오는데 실패했습니다. : " + error);
      }
    };
    fetchPreviousMessages();

    if (socketConnected) {
      // 연결이 성공하면, 서버에게 자바 스크립트 객체를 JSON 문자열로 변환하여 메시지를 전송
      // 웹 소켓은 텍스트 데이터만을 전송이 가능하기 때문에, 변환이 요구된다.
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          name: roomName,
          sender: sender,
          message: "처음으로 접속 합니다.",
        })
      );
    }

    // .onmessage : 서버로부터 메시지를 받았을 때 발생
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data); // 서버로부터 받은 메시지는 JSON 형태이기 때문에, 자바 스크립트 객체로 변환해야 한다.
      console.log(data);
      console.log(data.message);

      // 서버로부터 받은 메시지를 파싱하여 chatList에 할당
      // 이전 상태(변수 이름 지정 가능)를 인자로 받아,
      // [...prevItems : 이를 배열로 변환한 후,
      // ,data] : 새로운 항목을 배열의 끝에 추가
      // ... : 전개 연산자 : 배열이나 객체를 풀어헤칠 때 사용
      // prevItems 배열의 모든 항목을 풀어헤친 후, data를 추가한 새로운 배열을 생성
      setChatList((prevItems) => [...prevItems, data]);
    };
  }, [socketConnected, roomName, sender, roomId]);
  // 일반적으로는 useEffect() 내에서 사용하는 변수는 의존성 배열에 넣어주는 것이 바람직하다.
  // 최종적으로 변경되는 변수만을 useEffect()에 넣는다면, useEffect()가 변수의 이전 값을 참조하는 버그가 있기 때문이다.
  // ================================================================================

  // chatList가 업데이트 될 때마다 화면을 업데이트
  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);
  // React는 성능 최적화를 위해 기본적으로는 가상 DOM을 사용하지만,
  // 실제 DOM 요소에 접근해야만 하는 경우가 종종 존재한다.
  // useRef()는 Focus, Scroll 등의 기능을 구현할 때, 즉 실제 DOM 요소에 접근할 때 사용된다.

  useEffect(() => {
    if (chatContainerRef.current) {
      // 새로운 메시지가 도착할 때마다 scrollTop의 값을 scrollHeight로 설정
      // scrollTop : 요소의 세로 스크롤 위치를 픽셀 단위로 변환, 요소의 상단이 보이는 경우에는 값이 0 이다.
      // scrollHeight : 요소의 전체 내용 높이를 픽셀 단위로 반환
      // 즉 scrollTop = scollHeight는 요소의 최하단을 의미한다.
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <ChatContainer>
      <ChatHeader>
        {" "}
        <strong>{roomName}</strong>
      </ChatHeader>
      <MessagesContainer ref={chatContainerRef}>
        {/* ref 속성을 DOM 요소에 부여해서 해당 DOM 요소를 직접 가르키는 참조를 얻을 수 있다. 해당 참조는 useRef()를 통해 접근 가능하고, 이후 .current 속성을 통하여 실제 DOM 요소에 접근이 가능하다.*/}
        {chatList.map((chat, index) => (
          <Message key={index} $isSender={chat.sender === sender}>
            {`${chat.sender} > ${chat.message}`}
          </Message>
        ))}
      </MessagesContainer>
      <div>
        <Input
          placeholder="문자 전송"
          value={inputMsg}
          onChange={onChangMsg}
          onKeyUp={onEnterKey}
        />
        <SendButton onClick={onClickMsgSend}>전송</SendButton>
      </div>
      <CloseButton onClick={onClickMsgClose}>채팅 종료 하기</CloseButton>
    </ChatContainer>
  );
};
