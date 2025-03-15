# Node.jsの公式イメージをベースにする
FROM node:16

EXPOSE 3000

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .
RUN npm run build

# # DocumentDBの証明書をコピー
# RUN mkdir -p /usr/src/app/certs
# COPY global-bundle.pem /usr/src/app/certs/global-bundle.pem

# アプリケーションを起動
CMD ["npm", "start"]
