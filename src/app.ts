import express from 'express';
import cors from 'cors';
import { dbStatusMessage } from './repository/db';

// アプリケーションの初期化
const app = express();
const port = 3000;

// DBヘルスチェック
let statusMessage: string = '';
dbStatusMessage()
  .then(message => {
    statusMessage = message;
  })
  .catch(console.error);

// ルートハンドラー
app.get('/', (req, res) => {
  // DBヘルスチェックの結果を返す
  res.send(statusMessage);
  console.log(statusMessage);
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// CORS設定
app.use(cors({
  origin: 'https://resume-app-client-czwndnsiq-fush1m1s-projects.vercel.app',
}));
