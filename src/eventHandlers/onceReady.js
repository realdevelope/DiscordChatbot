import isUp from "is-up";

async function onceReady(client) {
  console.log("onceReady!");

  setInterval(async () => {
    checkWebStatus(client);
  }, 5 * 1000);
}

const url = "https://chatops-bot-test-20210226.taeuk.workers.dev/"; // 미리 제작된 죽은척하는 웹사이트
const channelId = "814801440265863211";

async function checkWebStatus(client) {
  if (await isUp(url)) {
    console.log("웹사이트 정상 작동중…");
  } else {
    console.log("웹사이트 오류! 확인하세요.");

    client.channels.cache
      .get(channelId)
      .send("⚠️ 웹사이트 접속이 불가합니다. 상태를 확인해 보세요.");
  }
}

export default onceReady;