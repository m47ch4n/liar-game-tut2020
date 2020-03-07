<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  liar-game-tut2020
</h1>

研究室配属をシミュレーションします。

## 🗒️ 特徴

- TUTのGSuiteでサインイン
- 研究室配属用の点数計算が容易
- みんなの希望研究室を調べられる

みんなの希望研究室は自分の希望研究室を入力した人のみに公開されます。


## 🚀 コントリビューション

コントリビューションは大歓迎です！

* issueは誰でも立てることができます。

* 開発に参加したい場合、Firebaseの権限が必要なので、松元([Twitter](https://twitter.com/m47ch4n))に連絡してください。

ディレクトリ構造は以下のとおりです。

```
.
├── README.md
├── client     (Webクライアント)
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── functions  (Firebase Functions)
└── shared     (共有用パッケージ)
```

1.  **Firebase CLIのインストール**

    FirebaseCLIをインストールしてください。

    ```bash
    npm install -g firebase-tools
    ```

    次に、Firebaseにログインします。

    ```bash
    firebase login
    ```

2.  **開発を始める**

    Webクライアントは`client`ディレクトリにあります。

    ```bash
    cd client/
    ```

    依存パッケージをインストール

    ```bash
    npm install
    ```

    サーバーを起動する
    ```bash
    npm start
    ```