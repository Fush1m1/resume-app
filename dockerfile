# 使用するベースイメージを指定
FROM node:16

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# TypeScriptをコンパイル
RUN npx tsc

# アプリケーションを実行
CMD ["npx", "tsx", "dist/app.js"]

# コンテナがリッスンするポートを指定
EXPOSE 3000
