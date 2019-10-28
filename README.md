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

## 実装予定
【signin】

・ログイン機能

・ユーザ新規登録機能（Googleも）

・ログイン後はhomeへ遷移

【home】

・ToDo追加機能

・ToDoを追加時に非公開にできる

・自分のToDoの削除と更新機能

・自分のコメントの削除と更新機能

・homeでは、自身のToDoリストが表示

・homeでは、自身のおきにいりToDoリストが表示

・homeでは、Followしている人のToDoが表示

・ユーザ検索機能

・ToDoに対してのアクション（いいねやコメント）

・ユーザを選択し、Followを選択できる機能（モーダルで）

・もっとみるでmyprofileに遷移

・ユーザサーチでSearchに遷移

【myprofile】

・自分のプロフィールの変更

・上記のToDo機能

・タグによるソート・フィルタ機能

・homeよりおおくの自分のToDoを確認可能

・タブで自分のToDoとfavのToDoを切り替える機能

【その他】

・ログアウトボタン機能

・ログアウトされるとsigninへ遷移

・ログアウトされた状態でsignin以外へアクセスすると、ログイン画面へリダイレクト

Docker、CircleCI、Nuxt.js、Firebase、GCPで開発

