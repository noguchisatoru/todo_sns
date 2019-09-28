# ToDoSNS

> ToDoSNS nuxt.js project

## Docker Setup(環境設定)

``` bash
# ビルドとコンテナの作成
$ docker-compose build
$ docker-compose up -d

# コンテナ内に入る
$ $ docker-compose exec web /bin/ash

# サーバの起動（http://localhost:3000）
$ npm run dev

```

## デプロイ
> CircleCIに設定しているためGithubにpushで自動で行われる。

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
