import { MessageEmbed } from "discord.js";
import axios from "axios";

async function onMessage(message) {
  const prefix ="!";

  if (message.author.bot === true || !message.content.startsWith(prefix)) { // ! 없이 입력시 무시
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/); // 슬라이스하고 스페이스 기준으로 배열로 만든다  ex) "안녕 상훈아" -> ["안녕", "상훈아"]
  const command = args.shift().toLowerCase();   //배열의 맨앞을 제외하고 반환함(채팅내용을 제외할것임) ex) [0, 1, 2] -> [1, 2]

  if (command === "안녕") {
    message.reply("반가워요!");
  }

  if (command === "투표") {
    const voteEmojis = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣"];

    const question = args.shift();

    if (args.length < 1 || args.length > 5) {
      message.reply("선택 항목은 1-5개만 지원합니다.");
      return;
    }

    const embed = new MessageEmbed(); // 삽입물

    let description = "";

    args.forEach((arg, i) => {
      description += `${voteEmojis[i]}: ${args[i]}\n`;  //신문법
    });

    embed.setTitle("투표하기");
    embed.setDescription(description);

    const vote = await message.reply("투표해 주세요.", { embed: embed });
    args.forEach(async (arg, i) => {  //버튼 생성 - 클릭시 카운트가 올라감
      await vote.react(voteEmojis[i]);
    });
  }
  if(command === "강아지"){
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");  //외부 API사용 / 서버가 이미지를 받아올때가지 기다리고 responce에 넣어줌
    //console.log(response.data);

    message.reply(response.data.message)
  }
}

export default onMessage;