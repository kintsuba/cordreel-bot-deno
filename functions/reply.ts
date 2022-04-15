import { replyByHome, replyBySpecified } from "./misskey.ts";

const reply = (body: any, token?: string) => {
  console.debug(body);
  console.debug(token);

  if (/ping/.test(body.text)) {
    return replyBySpecified("Pong! ……これで合ってるかな？", body.id, token);
  } else if (/かわいい|可愛い|カワイイ/.test(body.text)) {
    return replyByHome("えへへ……ありがとう！", body.id, token);
  } else if (/ありがと/.test(body.text)) {
    return replyByHome("どういたしまして！", body.id, token);
  } else if (/偉い|えらい/.test(body.text)) {
    return replyByHome("えへへ……", body.id, token);
  } else if (/コードリール/.test(body.text)) {
    return replyByHome("はーい！", body.id, token);
  } else if (/おはよ/.test(body.text)) {
    return replyByHome("おはよ！今日も1日頑張ろうね！", body.id, token);
  } else if (/こんにち(は|わ)/.test(body.text)) {
    return replyByHome("こんにちは！", body.id, token);
  } else if (/こんばん(は|わ)/.test(body.text)) {
    return replyByHome("こんばんは！", body.id, token);
  } else if (/おやす/.test(body.text)) {
    return replyByHome("おやすみなさい！", body.id, token);
  }
  // else if (/ブラックジャック|BJ|bj/.test(body.text)) {
  //   blackjacks.push(new Blackjack(body.id, misskeyUtils));
  // }
};

export default reply;
